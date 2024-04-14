export default ({
    models: { Room }
}) => ({
    get: (req, res, next) => {
        Room.findWithLessonCountFor(30, 'days')
            .then(rooms => {
                res.json({
                    ok: true,
                    data: rooms
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Room.findById(req.params.id)
            .then(room => {
                res.json({
                    ok: true,
                    data: room
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Room.create(req.body)
            .then(room => {
                res.json({
                    ok: true,
                    message: 'Комната создана',
                    data: room
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Room.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(room => {
                res.json({
                    ok: true,
                    message: 'Комната изменена',
                    data: room
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Room.findByIdAndDelete(req.params.id)
            .select('id')
            .then(room => {
                res.json({
                    ok: true,
                    message: 'Комната удалена',
                    data: room
                });
            })
            .catch(next);
    }
});