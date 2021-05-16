module.exports = ({
    models: { Lesson }
}) => ({
    get: (req, res, next) => {
        Lesson.find({ teachers: req.user.id, ...req.query })
            .sort({ date: 1 })
            .populate('client')
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
                    message: 'Урок создан',
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