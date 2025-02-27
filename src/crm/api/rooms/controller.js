export default ({
    models: { Room }
}) => ({
    async get(req, res) {
        const rooms = await Room.find().withLessonCountFor(30, 'days');

        res.json({
            ok: true,
            data: rooms
        });
    },

    async getOne(req, res) {
        const room = await Room.findById(req.params.id);

        res.json({
            ok: true,
            data: room
        });
    },

    async create(req, res) {
        const room = await Room.create(req.body);

        res.json({
            ok: true,
            message: 'Комната создана',
            data: room
        });
    },

    async update(req, res) {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json({
            ok: true,
            message: 'Комната изменена',
            data: room
        });
    },

    async delete(req, res) {
        const room = await Room.findByIdAndDelete(req.params.id)
            .select('id');

        res.json({
            ok: true,
            message: 'Комната удалена',
            data: room
        });
    }
});