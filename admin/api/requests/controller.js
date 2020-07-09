module.exports = ({ Request }) => ({
    get: (req, res, next) => {
        Request.get(req.query)
            .populate('managers', 'firstname lastname')
            .sort({ createdAt: 1 })
            .then(requests => {
                res.json({
                    ok: true,
                    data: requests
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Request.getById(req.params.requestId)
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