module.exports = ({
    models: { Lesson }
}) => ({
    get: (req, res, next) => {
        const query = {};

        if (req.query.date) {
            const from = new Date(req.query.date);
            const to = new Date(req.query.date);;

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

        Lesson.find(query)
            .populate('learner', 'firstname lastname email')
            .populate('teacher', 'firstname lastname email')
            .sort({ date: -1 })
            .limit(100)
            .then(lessons => {
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
            })
            .catch(next);
    },

    getTodays: (req, res, next) => {
        Lesson.findTodays()
            .populate('learner', 'firstname lastname email')
            .populate('teacher', 'firstname lastname email')
            .populate('room', 'title')
            .then(lessons => {
                res.json({
                    ok: true,
                    data: lessons
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Lesson.findById(req.params.lessonId)
            .populate('learner')
            .populate('teacher')
            .then(lesson => {
                res.json({
                    ok: true,
                    data: lesson
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Lesson.create(req.body)
            .then(lesson => {
                res.json({
                    ok: true,
                    message: req.body.length > 0 ? 'Уроки созданы' : 'Урок создан',
                    data: lesson
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Lesson.findByIdAndUpdate(req.params.lessonId, req.body, { new: true })
            .then(lesson => {
                res.json({
                    ok: true,
                    message: 'Урок изменен',
                    data: lesson
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Lesson.findByIdAndDelete(req.params.lessonId)
            .then(lesson => {
                res.json({
                    ok: true,
                    message: 'Урок удален',
                    data: {
                        id: lesson.id,
                        enrollment: lesson.enrollment
                    }
                });
            })
            .catch(next);
    }
});