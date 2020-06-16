module.exports = ({ User }) => ({
    get: (req, res, next) => {
        const query = req.query ? req.query : {};

        User.get(query)
            .then(users => {
                res.json({
                    ok: true,
                    data: users
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        User.getById(req.params.id)
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
        User.update(req.params.id, req.body)
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
        User.delete(req.params.id)
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Пользователь удален'
                });
            })
            .catch(next);
    }
});