module.exports = ({
    models: { Payment },
    services: { Checkout }
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
        const user = req.user;
        const data = {};

        Checkout.createPayment({
            amount: 4000, // Get price somehow
            description: 'Оплата обучения', // Clarify the exact message
            paymentMethod: req.body.usePaymentMethod ? user.paymentMethod : undefined,
            savePaymentMethod: req.body.savePaymentMethod,
            email: req.user.email,
            returnUrl: '/',
            metadata: {
                userId: req.user.id,
                enrollmentId: enrollment.id,
                planId: 1,
                packId: 16
            }
        });
    }
});

function map(payment) {
    return payment;
}