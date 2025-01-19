import { useEffect, useRef } from 'preact/hooks';

import http from 'shared/services/http';

import styles from './Checkout.module.scss';

export default function Checkout({
    data,
    onComplete,
    onError
}) {
    const checkoutRef = useRef();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const requestId = params.get('requestId');
        const utm = {
            source: params.get('utm_source'),
            medium: params.get('utm_medium'),
            campaign: params.get('utm_campaign'),
            content: params.get('utm_content'),
            term: params.get('utm_term')
        };

        http.post('/api/payments/create', {
            ...data,
            requestId,
            utm
        }).then(res => new Promise((resolve, reject) => {
            const payment = res.data;
            const checkout = new window.YooMoneyCheckoutWidget({
                confirmation_token: payment.confirmation.confirmationToken,
                customization: {
                    colors: {
                        control_primary: '#6c167b',
                        background: '#ffffff'
                    }
                },
                error_callback: reject
            });

            checkoutRef.current = checkout;

            checkout.on('success', () => resolve(payment));
            checkout.on('fail', reject);

            checkout.render('checkout');
        })).then(payment => http.post('/api/payments/process', {
            uuid: payment.uuid
        })).then(() => {
            onComplete();
        }).catch(error => {
            console.error(`Checkout error: ${error.message}`);
            onError(error);
        }).finally(() => {
            checkoutRef.current?.destroy();
            checkoutRef.current = null;
        });

        return () => {
            checkoutRef.current?.destroy();
        };
    }, []);

    return (
        <div id="checkout" className={styles.root} />
    );
}