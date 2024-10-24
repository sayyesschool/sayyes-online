export default ({
    models: { Payment }
}) => ({
    get: (req, res, next) => {
        Payment.find()
            .populate('learner', 'firstname lastname email')
            .then(payments => {
                res.json({
                    ok: true,
                    data: payments.map(map)
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Payment.findById(req.params.payment)
            .populate('learner', 'firstname lastname email')
            .then(payment => {
                res.json({
                    ok: true,
                    data: map(payment)
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Payment.create(req.body)
            .then(payment => {
                res.json({
                    ok: true,
                    message: 'Платеж создан',
                    data: payment
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Payment.findByIdAndUpdate(req.params.payment, req.body, { new: true })
            .then(payment => {
                res.json({
                    ok: true,
                    message: 'Платеж обновлен',
                    data: payment
                });
            })
            .catch(next);
    },

    resolve: (req, res, next) => {
        Payment.resolve(req.params.id)
            .then(payment => {
                res.json({
                    ok: true,
                    message: 'Платеж обновлен',
                    data: payment
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Payment.findByIdAndDelete(req.params.payment)
            .then(payment => {
                res.json({
                    ok: true,
                    message: 'Платеж удален',
                    data: payment
                });
            })
            .catch(next);
    }
});

function map(payment) {
    const object = payment.toObject();

    return object;
}