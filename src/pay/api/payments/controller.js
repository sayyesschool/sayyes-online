export default ({
    models: { User },
    services: { Checkout }
}) => ({
    async create(req, res) {
        const {
            email,
            name,
            userId = req.user?.id,
            formatId,
            typeId,
            packId,
            amount
        } = req.body ?? {};

        const user = await User.findOne({ $or: [{ _id: userId }, { email }] });

        if (userId && !user) throw {
            code: 404,
            message: 'Пользователь не найден'
        };

        if (!userId && !email) throw {
            code: 400,
            message: 'Не указан email'
        };

        const payment = await Checkout.createPayment({
            amount,
            description: 'Оплата за тренинги',
            confirmation: {
                type: 'embedded'
            },
            email: user?.email ?? email,
            metadata: {
                email: user ? undefined : email,
                name: user ? undefined : name,
                userId: user?.id,
                formatId: formatId,
                typeId: typeId,
                packId: packId
            }
        });

        res.json({
            ok: true,
            data: payment
        });
    },

    async process(req, res) {
        const { uuid } = req.body;

        const payment = await Checkout.resolvePayment(uuid);

        if (!payment) throw {
            code: 404,
            message: 'Платеж не найден'
        };

        if (!payment.paid) throw {
            code: 400,
            message: 'Платеж не оплачен'
        };

        res.json({
            ok: true
        });
    }
});