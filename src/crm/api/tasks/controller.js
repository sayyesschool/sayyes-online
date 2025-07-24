export default ({
    services: { Task }
}) => ({
    async get(req, res) {
        const query = { ...req.query };

        if (!query.assigneeId && !query.ownerId) {
            query.$or = [
                { ownerId: req.user.id },
                { assigneeId: req.user.id }
            ];
        }

        if (query.status) {
            query.completed = query.status === 'completed';
            delete query.status;
        }

        const tasks = await Task.get(query);

        res.json({
            ok: true,
            data: tasks
        });
    },

    async getOne(req, res) {
        const task = await Task.getOne(req.params);

        res.json({
            ok: true,
            data: task
        });
    },

    async create(req, res) {
        const task = await Task.create(req.body);

        res.json({
            ok: true,
            message: 'Задача создана',
            data: task.toData()
        });
    },

    async update(req, res) {
        const task = await Task.update(req.params, req.body);

        res.json({
            ok: true,
            message: 'Задача обновлена',
            data: task.toData()
        });
    },

    async delete(req, res) {
        const task = await Task.delete(req.params);

        res.json({
            ok: true,
            message: 'Задача удалена',
            data: task.toData()
        });
    }
});