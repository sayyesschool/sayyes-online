import YooKassa from 'yookassa';

export default ({
    config: { YOOKASSA_SHOP_ID, YOOKASSA_SECRET_KEY },
    services: { Mail }
}) => ({
    async index(req, res) {
        res.render('pages/pay', {
            id: 'pay'
        });
    },

    async payment(req, res) {
        const kassa = new YooKassa({
            shopId: YOOKASSA_SHOP_ID,
            secretKey: YOOKASSA_SECRET_KEY
        });

        const {
            contact: { email } = {},
            pack: { price, description } = {}
        } = req.body;

        kassa.createPayment({
            amount: {
                value: Number(price).toFixed(2),
                currency: 'RUB'
            },
            description,
            capture: true,
            confirmation: {
                type: 'embedded'
            },
            receipt: {
                customer: {
                    email
                },
                items: [{
                    description,
                    quantity: '1.00',
                    amount: {
                        value: Number(price).toFixed(2),
                        currency: 'RUB'
                    },
                    vat_code: '1',
                    payment_subject: 'service',
                    payment_mode: 'full_payment'
                }],
                tax_system_code: '6'
            },
            metadata: {
                email,
                price,
                description
            }
        }).then(payment => {
            res.json(payment);
        });
    },

    async email(req, res) {
        const { name, email, phone, pack, price } = req.body;

        Mail.send({
            to: [{ email: 'club@sayyes.school' }],
            subject: `Оплата от ${name} за ${pack} на ${price} руб.`,
            text: `Имя: ${name}\nEmail: ${email}\nТелефон: ${phone}\nПакет: ${pack}\nЦена: ${price}`
        });

        Mail.send({
            to: [{ email }],
            subject: 'Запись на встречу',
            templateId: 6422830
        }).then(response => {
            res.json({ status: 'ok' });
        }).catch(error => {
            console.error(error);
            res.json({ status: 'error', error });
        });
    }
});