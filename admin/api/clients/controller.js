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
            .populate({
                path: 'requests',
                select: 'status manager',
                populate: { path: 'manager', select: 'firstname lastname' }
            })
            .populate({
                path: 'enrollments',
                select: 'status manager type format',
                populate: { path: 'manager', select: 'firstname lastname' }
            })
            .populate({
                path: 'lessons',
                select: 'status teacher trial',
                populate: { path: 'teacher', select: 'firstname lastname' }
            })
            .populate({
                path: 'payments',
                select: 'status amount'
            })
            .then(client => {
                res.json({
                    ok: true,
                    data: client
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        console.log(req.body);
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