module.exports = ({
    models: { Lesson }
}) => ({
    async get(req, res) {
        const lessons = await Lesson.find({ teacher: req.user.id, ...req.query })
            .sort({ date: 1 })
            .populate('learner', 'firstname lastname email')
            .populate('room', 'title login password');

        res.json({
            ok: true,
            data: lessons
        });
    },

    async getOne(req, res) {
        const lesson = await Lesson.findById(req.params.lessonId)
            .populate('learner', 'firstname lastname email')
            .populate('room', 'title login password');

        res.json({
            ok: true,
            data: lesson
        });
    },

    async create(req, res) {
        req.body.teacher = req.user.id;

        const lesson = await Lesson.create(req.body);

        lesson.room = req.room;

        res.json({
            ok: true,
            message: 'Урок создан',
            data: lesson
        });
    },

    async update(req, res) {
        const lesson = await Lesson.findByIdAndUpdate(req.params.lessonId, req.body, {
            new: true,
            select: Object.keys(req.body).join(' ')
        });

        res.json({
            ok: true,
            message: 'Урок изменен',
            data: lesson
        });
    },

    async delete(req, res) {
        const lesson = await Lesson.findByIdAndDelete(req.params.lessonId);

        res.json({
            ok: true,
            message: 'Урок удален',
            data: {
                id: lesson.id,
                enrollment: lesson.enrollment
            }
        });
    }
});