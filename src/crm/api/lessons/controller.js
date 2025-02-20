import dt from 'shared/libs/datetime';

export default ({
    models: { Lesson }
}) => ({
    async get(req, res) {
        const query = {};

        if (req.query.date) {
            const from = dt(req.query.date).utc().startOf('day').toDate();
            const to = dt(from).utc().endOf('day').toDate();

            query.date = {
                $gte: from,
                $lt: to
            };
        } else {
            query.date = {
                $gte: dt().utc().subtract(7, 'days').toDate(),
                $lt: dt().utc().add(7, 'days').toDate()
            };
        }

        if (req.query.from) {
            query.date = query.date || {};
            query.date.$gte = dt(req.query.from).utc().startOf('day').toDate();
        }

        if (req.query.to) {
            query.date = query.date || {};
            query.date.$lt = dt(req.query.to).utc().endOf('day').toDate();
        }

        let lessons = await Lesson.find(query)
            .populate('learner', 'firstname lastname email')
            .populate('teacher', 'firstname lastname email')
            .populate('room', 'name')
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
            .populate('room', 'name');

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