module.exports = ({
    models: { User }
}) => ({
    get: (req, res, next) => {
        const regex = req.query.search && new RegExp(req.query.search, 'i');
        const query = regex ? {
            $or: [
                { firstname: regex },
                { lastname: regex },
                { email: regex },
                { phone: regex }
            ]
        } : req.query;

        User.find(query)
            .then(users => {
                res.json({
                    ok: true,
                    data: users
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        User.findById(req.params.id)
            .then(user => {
                res.json({
                    ok: true,
                    data: user
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        User.create(req.body)
            .then(user => {
                res.json({
                    ok: true,
                    message: 'Пользователь создан',
                    data: user
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(user => {
                res.json({
                    ok: true,
                    message: 'Пользователь изменен',
                    data: user
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        User.findByIdAndDelete(req.params.id)
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Пользователь удален'
                });
            })
            .catch(next);
    }
});