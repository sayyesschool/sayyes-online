module.exports = ({ Request }) => ({
    get: (req, res, next) => {
        Request.get({ status: { $in: ['new', 'processing'] }, ...req.query })
            .populate('manager', 'firstname lastname')
            .populate('client', 'firstname lastname')
            .sort({ createdAt: 1 })
            .then(requests => {
                res.json({
                    ok: true,
                    data: requests
                });
            })
            .catch(next);
    },

    getNew: (req, res, next) => {
        const minAgo = new Date(Date.now() - 60000);

        Request.get({
            status: 'new',
            createdAt: {
                $gt: minAgo
            }
        })
            .sort({ createdAt: 1 })
            .then(requests => {
                res.json({
                    ok: true,
                    message: requests.length > 0 ? (requests.length === 1 ? 'Новая заявка' : 'Новые заявки') : undefined,
                    data: requests
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Request.getById(req.params.requestId)
            .populate('manager', 'firstname lastname')
            .populate('client', 'firstname lastname')
            .then(request => {
                res.json({
                    ok: true,
                    data: request
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Request.create(req.body)
            .populate('manager', 'firstname lastname')
            .populate('client', 'firstname lastname')
            .then(request => {
                res.json({
                    ok: true,
                    message: 'Заявка создана',
                    data: request
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Request.update(req.params.requestId, req.body)
            .populate('manager', 'firstname lastname')
            .populate('client', 'firstname lastname')
            .then(request => {
                res.json({
                    ok: true,
                    message: 'Заявка изменена',
                    data: request
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Request.delete(req.params.requestId)
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Заявка удалена',
                    data: {
                        requestId: req.params.requestId
                    }
                });
            })
            .catch(next);
    }
});