module.exports = ({ Payment }) => ({
    get: (req, res, next) => {
        Payment.get()
            .populate('client', 'firstname lastname email')
            .then(payments => {
                res.json({
                    ok: true,
                    data: payments.map(map)
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Payment.getById(req.params.payment)
            .populate('client', 'firstname lastname email')
            .then(payment => {
                res.json({
                    ok: true,
                    data: map(payment)
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Payment.model.create(req.body)
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
        Payment.update(req.params.paymentId, req.body)
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
        Payment.delete(req.params.paymentId)
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Платеж удален',
                    data: {
                        paymentId: req.params.paymentId
                    }
                });
            })
            .catch(next);
    }
});

function map(payment) {
    const object = payment.toObject();

    return object;
}