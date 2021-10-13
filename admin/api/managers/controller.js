module.exports = ({
    models: { Manager }
}) => ({
    get: (req, res, next) => {
        const query = req.query ? req.query : {};

        Manager.find(query, 'firstname lastname email timezone note')
            .then(managers => {
                res.json({
                    ok: true,
                    data: managers
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Manager.findById(req.params.id)
            .populate({
                path: 'enrollments',
                select: 'status type domain format student schedules',
                populate: { path: 'student', select: 'firstname lastname' }
            })
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
                    message: 'Менеджер создан',
                    data: manager
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Manager.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(manager => {
                res.json({
                    ok: true,
                    message: 'Менеджер изменен',
                    data: manager
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Manager.findByIdAndDelete(req.params.id)
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Менеджер удален'
                });
            })
            .catch(next);
    }
});