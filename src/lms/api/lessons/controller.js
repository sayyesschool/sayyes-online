export default ({
    models: { Lesson },
    services: { Schedule }
}) => ({
    async get(req, res) {
        const lessons = await Lesson.find({
            teacherId: req.user.id,
            ...req.query
        })
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
        const lesson = await Schedule.scheduleLesson(req.body);

        lesson.room = req.room;

        res.json({
            ok: true,
            message: 'Урок создан',
            data: lesson
        });
    },

    async update(req, res) {
        let lesson;

        if (req.body.date && req.body.duration) {
            lesson = await Schedule.scheduleLesson({
                id: req.params.lessonId,
                ...req.body
            });
        } else {
            lesson = await Lesson.findByIdAndUpdate(req.params.lessonId, req.body, {
                new: true,
                select: Object.keys(req.body).join(' ')
            });
        }

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
                enrollmentId: lesson.enrollmentId
            }
        });
    }
});