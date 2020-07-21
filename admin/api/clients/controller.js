module.exports = ({ Client }) => ({
    get: (req, res, next) => {
        const query = req.query ? req.query : {};

        Client.get(query)
            .then(clients => {
                res.json({
                    ok: true,
                    data: clients
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Client.getById(req.params.id)
            .then(client => {
                res.json({
                    ok: true,
                    data: client
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Client.create(req.body)
            .then(client => {
                res.json({
                    ok: true,
                    message: 'Клиент создан',
                    data: client
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Client.update(req.params.id, req.body)
            .then(client => {
                res.json({
                    ok: true,
                    message: 'Клиент изменен',
                    data: client
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Client.delete(req.params.id)
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Клиент удален'
                });
            })
            .catch(next);
    }
});