const YooKassa = require('yookassa');

module.exports = ({ YOOKASSA_SHOP_ID, YOOKASSA_SECRET_KEY, APP_URL }, { Payment }) => {
    const kassa = new YooKassa({
        shopId: YOOKASSA_SHOP_ID,
        secretKey: YOOKASSA_SECRET_KEY
    });

    return {
        createPayment({ amount, description, method, returnUrl, email, metadata }) {
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
                    tax_system_code: '2'
                },
                metadata
            });
        },

        updatePayment(id, data, options) {
            return Payment.findByIdAndUpdate(id, data, { new: true, ...options });
        },

        deletePayment(id, ...args) {
            return Payment.findByIdAndDelete(id, ...args);
        }
    };
};