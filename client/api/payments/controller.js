module.exports = ({
    models: { Payment, Enrollment },
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
        if (!req.body.numberOfLessons) return next({ code: 401, message: 'Не указано количество уроков' });

        Enrollment.findOne({ _id: req.body.enrollmentId, client: req.user.id })
            .then(enrollment => {
                if (!enrollment) return next({ code: 401, message: 'Обучение не найдено' });

                return Checkout.createPayment({
                    amount: enrollment.getPrice(req.body.numberOfLessons),
                    description: `Оплата ${req.body.numberOfLessons} занятий по 50 минут`,
                    paymentMethod: req.body.usePaymentMethod ? user.paymentMethod : undefined,
                    savePaymentMethod: req.body.savePaymentMethod,
                    email: req.user.email,
                    returnUrl: '/',
                    metadata: {
                        clientId: enrollment.client,
                        enrollmentId: enrollment.id,
                        numberOfLessons: req.body.numberOfLessons
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