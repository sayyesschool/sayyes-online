const YooKassa = require('yandex-kassa');

module.exports = ({ YANDEX_KASSA_SHOP_ID, YANDEX_KASSA_SECRET, APP_URL }, { Payment }) => {
    const kassa = new YooKassa(YANDEX_KASSA_SHOP_ID, YANDEX_KASSA_SECRET);

    return {
        get(...args) {
            return Payment.find(...args);
        },

        getOne(...args) {
            return Payment.findOne(...args);
        },

        create({ amount, description, method, returnUrl, email, metadata }) {
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

        update(id, data, options) {
            return Payment.findByIdAndUpdate(id, data, { new: true, ...options });
        },

        delete(id, ...args) {
            return Payment.findByIdAndDelete(id, ...args);
        }
    };
};