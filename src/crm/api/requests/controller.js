import { toCSV } from 'shared/libs/csv';
import datetime from 'shared/libs/datetime';

export default ({
    models: { Request, Learner }
}) => ({
    get: (req, res, next) => {
        Request.find({ status: { $in: ['new', 'processing'] }, ...req.query })
            .populate('learner', 'firstname lastname')
            .populate('manager', 'firstname lastname')
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
            .populate('learner', 'firstname lastname')
            .populate('manager', 'firstname lastname')
            .then(request => {
                return Learner.findOne({
                    phone: request.contact.phone
                }).then(learner => {
                    return [request, learner];
                });
            })
            .then(([request, learner]) => {
                const data = request.toJSON({ getters: true, virtuals: true });

                data.existinglearner = learner;

                res.json({
                    ok: true,
                    data
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Request.create(req.body)
            .populate('learner', 'firstname lastname')
            .populate('manager', 'firstname lastname')
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
            .populate('learner', 'firstname lastname')
            .populate('manager', 'firstname lastname')
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
    },

    async export(req, res) {
        const requests = await Request.find({
            createdAt: {
                $gte: req.query.from ?? datetime().utc().startOf('day').toDate(),
                $lt: req.query.to ?? datetime().utc().endOf('day').toDate()
            },
            ...req.query
        }).sort({ createdAt: 1 });

        const data = requests.map(request => ({
            'Описание': request.description,
            'Дата': request.dateTimeString,
            'Статус': request.status,
            'Имя': request.contact?.name,
            'Email': request.contact?.email,
            'Телефон': request.contact?.phone,
            'Уровень': request.data?.level,
            'Цель': request.data?.goal,
            'UTM Source': request.utm?.source,
            'UTM Medium': request.utm?.medium,
            'UTM Campaign': request.utm?.campaign,
            'UTM Term': request.utm?.term
        }));

        const csv = toCSV(data);

        if (!csv) throw {
            code: 404,
            message: 'Нет данных'
        };

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="requests-${datetime().format('YYYY-MM-DD')}.csv"`);
        res.send(Buffer.from(csv, 'utf8'));
    }
});