import YooKassa from 'yookassa';

const PAYMENT_MODE = 'full_payment';
const PAYMENT_SUBJECT = 'service';
const TAX_SYSTEM_CODE = 6;
const VAT_CODE = 1;

export default ({
    YOOKASSA_SHOP_ID: shopId,
    YOOKASSA_SECRET_KEY: secretKey
}) => {
    const client = new YooKassa({
        shopId,
        secretKey
    });

    return {
        name: 'yookassa',

        async createPayment({
            amount,
            currency = 'RUB',
            description,
            customer,
            method,
            returnUrl,
            ...data
        } = {}) {
            return client.createPayment({
                amount: {
                    value: Number(amount).toFixed(2),
                    currency: 'RUB'
                },
                description,
                capture: true,
                payment_method_data: method ? {
                    type: method
                } : undefined,
                confirmation: returnUrl ? {
                    type: 'redirect',
                    return_url: returnUrl
                } : {
                    type: 'embedded'
                },
                receipt: {
                    customer,
                    items: [{
                        description,
                        quantity: '1.00',
                        amount: {
                            value: Number(amount).toFixed(2),
                            currency: 'RUB'
                        },
                        payment_mode: PAYMENT_MODE,
                        payment_subject: PAYMENT_SUBJECT,
                        vat_code: VAT_CODE
                    }],
                    tax_system_code: TAX_SYSTEM_CODE
                },
                ...data
            });
        },

        async getPayment(...args) {
            return client.getPayment(...args);
        },

        async cancelPayment(...args) {
            return client.cancelPayment(...args);
        }
    };
};