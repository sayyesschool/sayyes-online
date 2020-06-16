module.exports = ({ Payment }) => ({
    getMany: (req, res, next) => {
        return Payment.get({ user: req.user })
            .then(payments => {
                res.json({
                    ok: true,
                    data: payments.map(map)
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        return Payment.getOne({ user: req.user })
            .then(payment => {
                res.json({
                    ok: true,
                    data: map(payment)
                });
            })
            .catch(next);
    }
});

function map(payment) {
    return payment;
}