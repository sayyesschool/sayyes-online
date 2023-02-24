module.exports = ({
    models: { Request, Client }
}) => ({
    get: (req, res, next) => {
        Request.find({ status: { $in: ['new', 'processing'] }, ...req.query })
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

        Request.find({
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
        Request.findById(req.params.requestId)
            .populate('manager', 'firstname lastname')
            .populate('client', 'firstname lastname')
            .then(request => {
                return Client.findOne({
                    phone: request.contact.phone
                }).then(client => {
                    return [request, client];
                });
            })
            .then(([request, client]) => {
                const data = request.toJSON({ getters: true, virtuals: true });

                data.existingClient = client;

                res.json({
                    ok: true,
                    data
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
        Request.findByIdAndUpdate(req.params.requestId, req.body, { new: true })
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
        Request.findByIdAndDelete(req.params.requestId)
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