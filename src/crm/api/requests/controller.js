import { toCSV } from 'shared/libs/csv';
import datetime from 'shared/libs/datetime';

export default ({
    models: { Request, Learner }
}) => ({
    async get(req, res) {
        const query = getQuery(req);

        const requests = await Request.find(query)
            .populate('learner', 'firstname lastname')
            .populate('manager', 'firstname lastname')
            .sort({ createdAt: -1 });

        res.json({
            ok: true,
            data: requests
        });
    },

    async getNew(req, res) {
        const minAgo = datetime().subtract(1, 'minute').toDate();

        const requests = await Request.find({
            createdAt: { $gt: minAgo }
        })
            .populate('learner', 'firstname lastname')
            .populate('manager', 'firstname lastname')
            .sort({ createdAt: -1 });

        res.json({
            ok: true,
            message: requests.length > 0 ? (requests.length === 1 ? 'Новая заявка' : 'Новые заявки') : undefined,
            data: requests
        });
    },

    async getOne(req, res) {
        const request = await Request.findById(req.params.requestId)
            .populate('learner', 'firstname lastname')
            .populate('manager', 'firstname lastname');

        const learner = await Learner.findOne({
            phone: request.contact.phone
        });

        const data = request.toJSON({ getters: true, virtuals: true });

        data.existingLearner = learner;

        res.json({
            ok: true,
            data
        });
    },

    async create(req, res) {
        const newRequest = await Request.create(req.body);
        const request = await Request.findById(newRequest.id)
            .populate('learner', 'firstname lastname')
            .populate('manager', 'firstname lastname');

        res.json({
            ok: true,
            message: 'Заявка создана',
            data: request
        });
    },

    async update(req, res) {
        const request = await Request.findByIdAndUpdate(
            req.params.requestId,
            req.body,
            { new: true }
        )
            .populate('learner', 'firstname lastname')
            .populate('manager', 'firstname lastname');

        res.json({
            ok: true,
            message: 'Заявка изменена',
            data: request
        });
    },

    async delete(req, res) {
        const request = await Request.findByIdAndDelete(req.params.requestId);

        res.json({
            ok: true,
            message: 'Заявка удалена',
            data: {
                requestId: request.id
            }
        });
    },

    async export(req, res) {
        const query = getQuery(req);

        const requests = await Request.find(query).sort({ createdAt: -1 });

        const data = requests.map(request => ({
            'Тип': request.typeLabel,
            'Статус': request.statusLabel,
            'Дата': request.dateTimeString,
            'Имя': request.contact?.name,
            'Email': request.contact?.email,
            'Телефон': request.contact?.phone,
            'Канал': request.channelLabel,
            'Источник': request.sourceLabel,
            'Уровень': request.data?.level,
            'Цель': request.data?.goal,
            'Описание': request.description,
            'UTM Source': request.utm?.source,
            'UTM Medium': request.utm?.medium,
            'UTM Campaign': request.utm?.campaign,
            'UTM Term': request.utm?.term
        }));

        const csv = toCSV(data);

        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="requests-${datetime().format('YYYY-MM-DD_HH-mm')}.csv"`);

        res.send('\uFEFF' + csv);
    }
});

function getQuery(req) {
    const query = req.query;

    if (query.query) {
        const regex = new RegExp(query.query, 'i');

        return {
            $or: [
                { 'contact.name': regex },
                { 'contact.email': regex },
                { 'contact.phone': regex }
            ]
        };
    } else {
        if (query.from) {
            query.createdAt = { $gte: datetime(query.from).utc().startOf('day').toDate() };
            delete query.from;
        }

        if (query.to) {
            query.createdAt = {
                ...query.createdAt,
                $lt: datetime(query.to).utc().endOf('day').toDate()
            };
            delete query.to;
        }
    }

    return query;
}