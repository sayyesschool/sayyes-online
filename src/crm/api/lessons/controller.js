export default ({
    models: { Lesson }
}) => ({
    async get(req, res) {
        const query = {};

        if (req.query.date) {
            const from = new Date(req.query.date);
            const to = new Date(req.query.date);

            to.setDate(from.getDate() + 1);

            query.date = {
                $gte: from,
                $lt: to
            };
        }

        if (req.query.from) {
            query.date = query.date || {};
            query.date.$gt = new Date(req.query.from);
        }

        if (req.query.to) {
            query.date = query.date || {};
            query.date.$lt = new Date(req.query.to);
        }

        let lessons = await Lesson.find(query)
            .populate('learner', 'firstname lastname email')
            .populate('teacher', 'firstname lastname email')
            .populate('room', 'title')
            .sort({ date: -1 })
            .limit(100);

        if (req.query.days) {
            const days = req.query.days.split(',').map(v => Number(v));

            lessons = lessons.filter(lesson => {
                const day = new Date(lesson.date).getDay();

                return days.includes(day);
            });
        }

        res.json({
            ok: true,
            data: lessons
        });
    },

    async getTodays(req, res) {
        const lessons = await Lesson.findTodays()
            .populate('learner', 'firstname lastname email')
            .populate('teacher', 'firstname lastname email')
            .populate('room', 'title');

        res.json({
            ok: true,
            data: lessons
        });
    },

    async getOne(req, res) {
        const lesson = await Lesson.findById(req.params.lessonId)
            .populate('learner')
            .populate('teacher');

        res.json({
            ok: true,
            data: lesson
        });
    },

    async create(req, res) {
        const lesson = await Lesson.create(req.body);

        res.json({
            ok: true,
            message: req.body.length > 0 ? 'Уроки созданы' : 'Урок создан',
            data: lesson
        });
    },

    async update(req, res) {
        const lesson = await Lesson.findByIdAndUpdate(
            req.params.lessonId,
            req.body,
            { new: true }
        );

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