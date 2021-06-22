module.exports = ({
    models: { Lesson }
}) => ({
    get: (req, res, next) => {
        Lesson.find(req.query)
            .sort({ date: 1 })
            .populate('client')
            .populate('teacher')
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
            .populate('client')
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