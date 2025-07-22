export default ({
    models: { Task }
}) => ({
    async get(query) {
        const filters = query;

        if (query.description) {
            filters.description = new RegExp(query.description, 'i');
        }

        if (filters.duePeriod) {
            Object.assign(filters, getDueDateFilter(filters.duePeriod));
            delete filters.duePeriod;
        }

        return Task.find(filters)
            .sort({ createdAt: -1 })
            .populate('owner', 'firstname lastname')
            .populate('assignee', 'firstname lastname role')
            .populate({
                path: 'comments.author'
            });
    },

    async getOne(params) {
        return Task.findById(params.id)
            .populate('owner', 'firstname lastname')
            .populate('assignee', 'firstname lastname role')
            .populate({
                path: 'comments.author'
            });
    },

    async create(body) {
        const createdTask = await Task.create(body);

        // TODO: populate нельзя применить напрямую к create?
        return Task.findById(createdTask._id)
            .populate('assignee', 'firstname lastname');
    },

    async update(params, body) {
        return Task.findByIdAndUpdate(params.id, body, { new: true })
            .populate('assignee', 'firstname lastname');
    },

    async delete(params) {
        return Task.findByIdAndDelete(params.id);
    }
});

function getDueDateFilter(value) {
    const now = new Date();

    switch (value) {
        case 'today': {
            const start = new Date();
            start.setHours(0, 0, 0, 0);

            const end = new Date();
            end.setHours(23, 59, 59, 999);

            return { dueDate: { $gte: start, $lte: end } };
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

            return { dueDate: { $gte: start, $lte: end } };
        }

        case 'overdue': {
            return { dueDate: { $lt: now } };
        }

        case 'none': {
            return { dueDate: { $exists: false } };
        }

        default:
            return {};
    }
}