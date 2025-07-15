export default ({
    models: { Task }
}) => ({
    async get(query) {
        const filters = query?.note
            ? { ...query, note: new RegExp(query.note, 'i') }
            : query;

        if (filters.dueAt) {
            const dueAtFilter = getDueAtFilter(filters.dueAt);
            Object.assign(filters, dueAtFilter);
        }

        return await Task.find(filters)
            .sort({ createdAt: -1 })
            .populate('manager', 'firstname lastname')
            .populate({
                path: 'comments.author',
                model: 'User'
            });
    },

    async getOne(params) {
        return await Task.findById(params.id)
            .populate('manager', 'firstname lastname')
            .populate({
                path: 'comments.author',
                model: 'User'
            });
    },

    async create(body) {
        const createdTask = await Task.create(body);

        // TODO: populate нельзя применить напрямую к create?
        return await Task.findById(createdTask._id)
            .populate('manager', 'firstname lastname');
    },

    async update(params, body) {
        console.log(898, params, body);

        return await Task.findByIdAndUpdate(params.id, body, { new: true })
            .populate('manager', 'firstname lastname');
    },

    async delete(params) {
        return await Task.findByIdAndDelete(params.id);
    }
});

function getDueAtFilter(value) {
    const now = new Date();

    switch (value) {
        case 'today': {
            const start = new Date();
            start.setHours(0, 0, 0, 0);

            const end = new Date();
            end.setHours(23, 59, 59, 999);

            return { dueAt: { $gte: start, $lte: end } };
        }

        case 'week': {
            const dayOfWeek = now.getDay();
            const diffToMonday = (dayOfWeek + 6) % 7;

            const start = new Date(now);
            start.setDate(now.getDate() - diffToMonday);
            start.setHours(0, 0, 0, 0);

            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            end.setHours(23, 59, 59, 999);

            return { dueAt: { $gte: start, $lte: end } };
        }

        case 'overdue': {
            return { dueAt: { $lt: now } };
        }

        default:
            return {};
    }
}