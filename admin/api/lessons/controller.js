module.exports = ({ Lesson }) => ({
    get: (req, res, next) => {
        Lesson.get(req.query)
            .sort({ date: 1 })
            .populate('teacher')
            .populate('student')
            .then(lessons => {
                res.json({
                    ok: true,
                    data: lessons
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Lesson.getById(req.params.lessonId)
            .populate('teacher')
            .populate('student')
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
        Lesson.update(req.params.lessonId, req.body)
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
        Lesson.delete(req.params.lessonId)
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Урок удален',
                    data: {
                        lessonId: req.params.lessonId
                    }
                });
            })
            .catch(next);
    }
});