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

    getMe: (req, res, next) => {
        res.json({
            ok: true,
            data: {
                id: req.user.id,
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                fullname: req.user.fullname,
                email: req.user.email,
                role: req.user.role
            }
        });
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