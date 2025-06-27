export default ({
    models: { Task }
}) => ({
    async get(req, res) {
        const filters = req.query?.note
            ? { ...req.query, note: new RegExp(req.query.note, 'i') }
            : req.query;

        const tasks = await Task.find(filters)
            .sort({ createdAt: -1 })
            .populate('manager', 'firstname lastname')
            .populate({
                path: 'comments.author',
                model: 'User'
            });

        res.json({
            ok: true,
            data: tasks
        });
    },

    async getOne(req, res) {
        const task = await Task.findById(req.params.id)
            .populate('manager', 'firstname lastname')
            .populate({
                path: 'comments.author',
                model: 'User'
            });

        res.json({
            ok: true,
            data: task
        });
    },

    // TODO: populate нельзя применить напрямую к create?
    async create(req, res) {
        const createdTask = await Task.create(req.body);
        const task = await Task.findById(createdTask._id)
            .populate('manager', 'firstname lastname');

        res.json({
            ok: true,
            message: 'Задача создана',
            data: task.toData()
        });
    },

    async update(req, res) {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('manager', 'firstname lastname');

        res.json({
            ok: true,
            message: 'Задача обновлена',
            data: task.toData()
        });
    },

    async delete(req, res) {
        const task = await Task.findByIdAndDelete(req.params.id);

        res.json({
            ok: true,
            message: 'Задача удалена',
            data: task.toData()
        });
    }
});