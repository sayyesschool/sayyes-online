import YooKassa from 'yookassa';

export default ({
    config: {
        APP_URL,
        YOOKASSA_SHOP_ID,
        YOOKASSA_SECRET_KEY
    },
    models: { Payment }
}) => {
    const kassa = new YooKassa({
        shopId: YOOKASSA_SHOP_ID,
        secretKey: YOOKASSA_SECRET_KEY
    });

    return {
        async createPayment({ amount, description, method, returnUrl, email, metadata, ...override }) {
            const payment = await kassa.createPayment({
                amount: {
                    value: Number(amount).toFixed(2),
                    currency: 'RUB'
                },
                description,
                capture: true,
                payment_method_data: method ? {
                    type: method
                } : undefined,
                confirmation: {
                    type: 'redirect',
                    return_url: returnUrl ? `${APP_URL}${returnUrl}` : APP_URL
                },
                receipt: {
                    customer: {
                        email
                    },
                    items: [{
                        description,
                        quantity: '1.00',
                        amount: {
                            value: Number(amount).toFixed(2),
                            currency: 'RUB'
                        },
                        vat_code: '1',
                        payment_subject: 'service',
                        payment_mode: 'full_payment'
                    }],
                    tax_system_code: '2' // TODO: Check this value, maybe it should be '6'
                },
                metadata,
                ...override
            });

            return Payment.create({
                uuid: payment.id,
                status: payment.status,
                amount: payment.amount.value,
                date: payment.captured_at,
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
                customer: payment.metadata.customer,
                metadata: {
                    ...payment.metadata,
                    customer: undefined
                },
                test: payment.test,
                createdAt: payment.created_at,
                expiresAt: payment.expires_at,
                paidAt: payment.captured_at
            });
        },

        async resolvePayment(uuid) {
            const payment = await kassa.getPayment(uuid);

            return Payment.findOneAndUpdate({ uuid: payment.id }, {
                $set: {
                    status: payment.status,
                    amount: payment.amount.value,
                    date: payment.captured_at,
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
                    }
                }
            }, { new: true });
        },

        async updatePayment(id, data, options) {
            return Payment.findByIdAndUpdate(id, data, { new: true, ...options });
        },

        async cancelPayment(uuid) {
            return kassa.getPayment(uuid)
                .then(payment => {
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
                });
        },

        async deletePayment(id, ...args) {
            return Payment.findByIdAndDelete(id, ...args);
        }
    };
};