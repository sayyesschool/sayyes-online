const YooKassa = require('yookassa');
const { isValidObjectId } = require('mongoose');

module.exports = ({
    config: { APP_URL, YOOKASSA_SHOP_ID, YOOKASSA_SECRET_KEY },
    models: { Payment }
}) => {
    const kassa = new YooKassa({
        shopId: YOOKASSA_SHOP_ID,
        secretKey: YOOKASSA_SECRET_KEY
    });

    return {
        get(...args) {
            return Payment.find(...args);
        },

        getOne(...args) {
            return Payment.findOne(...args);
        },

        getById(...args) {
            return Payment.findById(...args);
        },

        getByMonth() {
            const today = new Date();

            return Payment.aggregate()
                .match({
                    date: {
                        $gt: new Date(today.getFullYear() - 1, 11, 31),
                        $lt: new Date(today.getFullYear() + 1, 0)
                    }
                })
                .group({
                    _id: { $month: '$paidAt' },
                    count: { $sum: 1 },
                    amount: { $sum: '$price' }
                });
        },

        create(...args) {
            return Payment.create(...args);
        },

        update(query, data, options) {
            return isValidObjectId(query) ?
                Payment.findByIdAndUpdate(query, data, { ...options }) :
                Payment.findOneAndUpdate(query, data, { ...options });
        },

        delete(query, ...args) {
            return isValidObjectId(query) ?
                Payment.findByIdAndDelete(query, ...args) :
                Payment.findOneAndDelete(query, ...args);
        },

        make({ amount, description, method, returnUrl, email, metadata }) {
            return kassa.createPayment({
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
                    tax_system_code: '6'
                },
                metadata
            }).then(payment => {
                return Payment.create({
                    uuid: payment.id,
                    status: payment.status,
                    amount: payment.amount.value,
                    date: payment.captured_at,
                    paid: payment.paid,
                    description: payment.description,
                    confirmationUrl: payment.confirmationUrl,
                    user: payment.metadata.userId,
                    meeting: payment.metadata.meetingId,
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
                });
            });
        },

        resolve(uuid) {
            return kassa.getPayment(uuid)
                .then(payment => {
                    return Payment.findOneAndUpdate({ uuid: payment.id }, {
                        $set: {
                            status: payment.status,
                            amount: payment.amount.value,
                            date: payment.captured_at,
                            paid: payment.paid,
                            description: payment.description,
                            confirmationUrl: payment.confirmationUrl,
                            meeting: payment.metadata.meetingId,
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
                });
        },

        cancel(uuid) {
            return kassa.getPayment(uuid)
                .then(payment => {
                    if (payment.isPending || payment.isCanceled) {
                        return Payment.findOneAndUpdate({ uuid: payment.id }, {
                            $set: {
                                status: 'canceled'
                            },
                            $unset: {
                                confirmationUrl: ''
                            }
                        }, { new: true });
                    }
                });
        }
    };
};