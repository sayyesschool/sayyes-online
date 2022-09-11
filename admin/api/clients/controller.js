module.exports = ({
    models: { Client }
}) => ({
    get: (req, res, next) => {
        const query = req.query ? req.query : {};

        Client.find(query)
            .then(clients => {
                res.json({
                    ok: true,
                    data: clients
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Client.findById(req.params.id)
            .populate({
                path: 'requests',
                select: 'status manager contact',
                populate: { path: 'manager', select: 'firstname lastname' }
            })
            .populate({
                path: 'enrollments',
                select: 'status type domain format manager schedules',
                populate: { path: 'manager', select: 'firstname lastname' }
            })
            .populate({
                path: 'transactions',
                populate: { path: 'enrollment', select: 'domain' }
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
        Client.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
        Client.findByIdAndDelete(req.params.id)
            .then(client => {
                res.json({
                    ok: true,
                    message: 'Клиент удален',
                    data: {
                        id: client.id
                    }
                });
            })
            .catch(next);
    }
});