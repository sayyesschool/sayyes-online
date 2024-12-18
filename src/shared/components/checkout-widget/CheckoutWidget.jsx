import { useEffect, useRef, useState } from 'react';

import { YOOKASSA_SCRIPT_URL } from 'shared/constants';
import { useScript } from 'shared/hooks/dom';
import http from 'shared/services/http';

import CheckoutWidgetErrorState from './CheckoutWidgetErrorState';
import CheckoutWidgetSuccessState from './CheckoutWidgetSuccessState';

import styles from './CheckoutWidget.module.scss';

export default function CheckoutWidget({ data, onLoad, onComplete, onError }) {
    const dataRef = useRef(data);
    const callbackRefs = useRef({ onLoad, onComplete, onError });
    const checkoutRef = useRef();

    const { isLoaded } = useScript(YOOKASSA_SCRIPT_URL);

    const [isComplete, setComplete] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!isLoaded) return;

        const { onLoad, onComplete, onError } = callbackRefs.current;

        http.post('/api/payments', dataRef.current)
            .then(res => {
                const data = res.data;
                const checkout = new window.YooMoneyCheckoutWidget({
                    confirmation_token: data.confirmation.confirmationToken,
                    customization: {
                        colors: {
                            control_primary: '#6c167b',
                            background: '#ffffff'
                        }
                    },
                    error_callback: error => {
                        console.log(error);
                        onError(error);
                    }
                });

                checkoutRef.current = checkout;

                checkout.render('payment').then(() => {
                    onLoad?.();
                });

                checkout.on('complete', () => {
                    fetch('/api/payments/process', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            source: 'client',
                            event: 'payment.succeeded',
                            object: {
                                id: data.uuid,
                                metadata: data.metadata
                            }
                        })
                    }).then(() => {
                        setComplete(true);
                        onComplete?.();
                        checkout.destroy();
                    }).catch(onError);
                });
            })
            .catch(error => {
                setError(error);
                onError(error);
                checkoutRef.current?.destroy();
            });

        return () => {
            checkoutRef.current?.destroy();
        };
    }, [isLoaded]);

    if (isComplete) return (
        <CheckoutWidgetSuccessState />
    );

    if (error) return (
        <CheckoutWidgetErrorState error={error} />
    );

    return (
        <div className={styles.root} id="payment" />
    );
}