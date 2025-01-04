export default ({
    models: { Payment }
}) => ({
    async get(req, res) {
        const payments = await Payment.find(req.query)
            .populate('user', 'firstname lastname email role');

        res.json({
            ok: true,
            data: payments.map(p => p.toData())
        });
    },

    async getOne(req, res) {
        const payment = await Payment.findById(req.params.id)
            .populate('user', 'firstname lastname email role');

        res.json({
            ok: true,
            data: payment.toData()
        });
    },

    async create(req, res) {
        const payment = await Payment.create(req.body);

        res.json({
            ok: true,
            message: 'Платеж создан',
            data: payment.toData()
        });
    },

    async update(req, res) {
        const payment = await Payment.findByIdAndUpdate(req.params.payment, req.body, { new: true });

        res.json({
            ok: true,
            message: 'Платеж обновлен',
            data: payment.toData()
        });
    },

    async resolve(req, res) {
        const payment = await Payment.resolve(req.params.id);

        res.json({
            ok: true,
            message: 'Платеж обновлен',
            data: payment.toData()
        });
    },

    async delete(req, res) {
        const payment = await Payment.findByIdAndDelete(req.params.payment);

        res.json({
            ok: true,
            message: 'Платеж удален',
            data: payment.toData()
        });
    }
});