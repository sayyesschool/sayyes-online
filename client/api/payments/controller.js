module.exports = ({
    models: { Payment }
}) => ({
    getMany: (req, res, next) => {
        return Payment.find({ user: req.user })
            .then(payments => {
                res.json({
                    ok: true,
                    data: payments.map(map)
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        return Payment.findOne({ user: req.user })
            .then(payment => {
                res.json({
                    ok: true,
                    data: map(payment)
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        return Checkout.createPayment({
            amount: req.body.amount,
            description: req.body.description,
            paymentMethod: req.body.usePaymentMethod ? req.user.paymentMethod : undefined,
            savePaymentMethod: req.body.savePaymentMethod,
            email: req.user.email,
            returnUrl: '/',
            metadata: {
                userId: req.user.id,
                ...req.body.metadata
            }
        }).then(payment => {
            return Payment.create({
                uuid: payment.id,
                status: payment.status,
                amount: payment.amount.value,
                description: payment.description,
                confirmationUrl: payment.confirmationUrl,
                test: payment.test,
                operator: 'yookassa',
                client: req.user.id,
                enrollment: enrollment.id
            });
        }).then(payment => {
            res.json({
                ok: true,
                data: payment
            });
        })
            .catch(next);
    }
});

function map(payment) {
    return payment;
}