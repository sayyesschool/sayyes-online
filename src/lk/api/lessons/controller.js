export default ({
    models: { Lesson }
}, { mapLesson }) => ({
    getMany: (req, res, next) => {
        Lesson.find({
            $or: [
                { learnerId: req.user }
            ]
        })
            .populate('learner', 'firstname lastname fullname')
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
            .populate('learner', 'firstname lastname fullname')
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