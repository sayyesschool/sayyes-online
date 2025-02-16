import { useEffect, useRef, useState } from 'react';

import { PAY_URL, YOOKASSA_SCRIPT_URL } from 'shared/constants';
import { useScript } from 'shared/hooks/dom';
import http from 'shared/services/http';

import CheckoutWidgetError from './CheckoutWidgetError';
import CheckoutWidgetSuccess from './CheckoutWidgetSuccess';

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

        http.post(`${PAY_URL}/api/payments/create`, dataRef.current)
            .then(res => {
                const payment = res.data;
                const checkout = new window.YooMoneyCheckoutWidget({
                    confirmation_token: payment.confirmation.confirmationToken,
                    customization: {
                        colors: {
                            control_primary: '#6c167b',
                            background: '#ffffff'
                        }
                    },
                    error_callback: error => {
                        console.error(error);
                        onError(error);
                    }
                });

                checkoutRef.current = checkout;

                checkout.render('payment').then(() => {
                    onLoad?.();
                });

                checkout.on('complete', () => {
                    fetch(`${PAY_URL}/api/payments/process`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payment)
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
        <CheckoutWidgetError />
    );

    if (error) return (
        <CheckoutWidgetSuccess error={error} />
    );

    return (
        <div className={styles.root} id="payment" />
    );
}