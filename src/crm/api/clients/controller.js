module.exports = ({
    models: { Learner }
}) => ({
    get: (req, res, next) => {
        const query = req.query ? req.query : {};

        Learner.find(query)
            .then(clients => {
                res.json({
                    ok: true,
                    data: clients
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Learner.findById(req.params.id)
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
        Learner.create(req.body)
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
        Learner.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
        Learner.findByIdAndDelete(req.params.id)
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