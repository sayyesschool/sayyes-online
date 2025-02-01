export default ({
    config: { APP_URL },
    clients: { checkout },
    models: { Payment }
}) => {
    return {
        async createPayment({
            amount,
            description,
            method,
            returnUrl,
            email,
            metadata = {},
            ...override
        } = {}) {
            if (!amount) throw {
                code: 400,
                message: 'Не указана сумма платежа'
            };

            const payment = await checkout.createPayment({
                amount,
                description,
                method,
                returnUrl: returnUrl ? `${APP_URL}${returnUrl}` : undefined,
                customer: { email },
                metadata,
                ...override
            });

            return Payment.create({
                uuid: payment.id,
                status: payment.status,
                amount: payment.amount.value,
                date: payment.captured_at,
                description: payment.description,
                operator: checkout.name,
                paid: payment.paid,
                test: payment.test,
                confirmation: payment.confirmation && {
                    type: payment.confirmation.type,
                    confirmationToken: payment.confirmation.confirmation_token,
                    confirmationUrl: payment.confirmation.confirmation_url,
                    returnUrl: payment.confirmation.return_url
                },
                method: payment.payment_method && {
                    id: payment.payment_method.id,
                    type: payment.payment_method.type,
                    saved: payment.payment_method.saved,
                    card: payment.payment_method.card && {
                        type: payment.payment_method.card.card_type,
                        last4: payment.payment_method.card.last4,
                        month: payment.payment_method.card.expiry_month,
                        year: payment.payment_method.card.expiry_year,
                        country: payment.payment_method.card.issuer_country,
                        issuer: payment.payment_method.card.issuer_name
                    }
                },
                userId: metadata.userId,
                metadata: payment.metadata,
                createdAt: payment.created_at,
                expiresAt: payment.expires_at,
                paidAt: payment.captured_at
            });
        },

        async resolvePayment(uuid) {
            const payment = await checkout.getPayment(uuid);

            return Payment.findOneAndUpdate({ uuid: payment.id }, {
                status: payment.status,
                amount: payment.amount.value,
                paid: payment.paid,
                description: payment.description,
                confirmation: payment.confirmation && {
                    type: payment.confirmation.type,
                    confirmationToken: payment.confirmation.confirmation_token,
                    confirmationUrl: payment.confirmation.confirmation_url,
                    returnUrl: payment.confirmation.return_url
                },
                method: payment.payment_method && {
                    id: payment.payment_method.id,
                    type: payment.payment_method.type,
                    saved: payment.payment_method.saved,
                    card: payment.payment_method.card && {
                        type: payment.payment_method.card.card_type,
                        last4: payment.payment_method.card.last4,
                        month: payment.payment_method.card.expiry_month,
                        year: payment.payment_method.card.expiry_year,
                        country: payment.payment_method.card.issuer_country,
                        issuer: payment.payment_method.card.issuer_name
                    }
                },
                paidAt: payment.captured_at
            }, { new: true });
        },

        async cancelPayment(uuid) {
            console.log(await checkout.getPayment(uuid));
            const payment = await checkout.cancelPayment(uuid);

            if (payment.isPending || payment.isCanceled) {
                return Payment.findOneAndUpdate({ uuid: payment.id }, {
                    $set: {
                        status: 'canceled'
                    },
                    $unset: {
                        confirmation: ''
                    }
                }, { new: true });
            }
        }
    };
};