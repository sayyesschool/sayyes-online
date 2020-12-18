module.exports = ({
    models: { Lesson }
}, { mapLesson }) => ({
    getMany: (req, res, next) => {
        Lesson.find({
            $or: [
                { client: req.user }
            ]
        })
            .populate('client', 'firstname lastname fullname')
            .populate('teacher', 'firstname lastname fullname')
            .then(lessons => {
                res.json({
                    ok: true,
                    data: lessons.map(lesson => mapLesson(lesson, req.user))
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Lesson.findById(req.params.lessonId)
            .populate('client', 'firstname lastname fullname')
            .populate('teacher', 'firstname lastname fullname')
            .then(lesson => {
                if (!lesson) {
                    const error = new Error('Урок не найден');
                    error.status = 404;
                    return next(error);
                }

                res.json({
                    ok: true,
                    data: mapLesson(lesson, req.user)
                });
            })
            .catch(next);
    }
});