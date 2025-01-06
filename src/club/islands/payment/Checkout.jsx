import { useEffect, useRef } from 'preact/hooks';

export default function Checkout({ contact, pack, meetingId, onComplete, onError }) {
    const checkoutRef = useRef();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        fetch('/api/payments/create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...contact,
                packId: pack.id,
                meetingId,
                requestId: params.get('requestId'),
                utm: {
                    source: params.get('utm_source'),
                    medium: params.get('utm_medium'),
                    campaign: params.get('utm_campaign'),
                    content: params.get('utm_content'),
                    term: params.get('utm_term')
                }
            })
        })
            .then(res => res.json())
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

                checkout.render('payment');

                checkout.on('complete', () => {
                    fetch('/api/payments/process', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            uuid: data.uuid
                        })
                    }).then(() => {
                        checkout.destroy();
                        onComplete();
                    }).catch(onError);
                });
            })
            .catch(error => {
                console.log(error);
                checkoutRef.current?.destroy();
                onError(error);
            });

        return () => {
            checkoutRef.current?.destroy();
        };
    }, []);

    return (
        <div id="payment" />
    );
}