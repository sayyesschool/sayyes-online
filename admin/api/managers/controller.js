module.exports = Manager => ({
    get: (req, res, next) => {
        const query = req.query ? req.query : {};

        Manager.get(query, 'firstname lastname')
            .then(managers => {
                res.json({
                    ok: true,
                    data: managers
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Manager.getById(req.params.id)
            .then(manager => {
                res.json({
                    ok: true,
                    data: manager
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Manager.create(req.body)
            .then(manager => {
                res.json({
                    ok: true,
                    message: 'Пользователь создан',
                    data: manager
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Manager.update(req.params.id, req.body)
            .then(manager => {
                res.json({
                    ok: true,
                    message: 'Пользователь изменен',
                    data: manager
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Manager.delete(req.params.id)
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Пользователь удален'
                });
            })
            .catch(next);
    }
});