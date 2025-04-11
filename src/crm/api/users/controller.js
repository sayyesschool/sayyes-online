export default ({
    models: { User }
}) => ({
    async get(req, res) {
        const query = req.query;

        if (query.q) {
            const regex = new RegExp(query.q, 'i');

            query.$or = [
                { firstname: regex },
                { lastname: regex },
                { email: regex },
                { phone: regex }
            ];

            delete query.q;
        }

        const users = await User.find(query);

        res.json({
            ok: true,
            data: users
        });
    },

    async getOne(req, res) {
        const user = await User.findById(req.params.id);

        res.json({
            ok: true,
            data: user
        });
    },

    async create(req, res) {
        const user = await User.create(req.body);

        res.json({
            ok: true,
            message: 'Пользователь создан',
            data: user
        });
    },

    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json({
            ok: true,
            message: 'Пользователь изменен',
            data: user
        });
    },

    async delete(req, res) {
        const user = await User.findByIdAndDelete(req.params.id);

        res.json({
            ok: true,
            message: 'Пользователь удален',
            data: {
                id: user.id
            }
        });
    }
});