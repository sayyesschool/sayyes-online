module.exports = ({ Lesson }) => ({
    findOne: (req, res, next, id) => {
        Lesson.getById(id)
            .then(lesson => {
                if (!lesson) {
                    const error = new Error('Урок не найдн');
                    error.status = 404;
                    return next(error);
                }

                req.lesson = lesson;

                next();
            })
            .catch(next);
    },

    getMany: (req, res, next) => {
        Lesson.get({
            $or: [
                { date: { $gte: new Date() } },
                { client: req.user }
            ]
        })
            .then(lessons => {
                res.json({
                    ok: true,
                    data: lessons.map(lesson => map(lesson, req.user))
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Lesson.getById(req.params.lessonId)
            .populate('student', 'firstname lastname fullname')
            .populate('teacher', 'firstname lastname fullname')
            .then(lesson => {
                if (!lesson) {
                    const error = new Error('Урок не найдн');
                    error.status = 404;
                    return next(error);
                }

                const data = req.lesson.toJSON();

                data.student = {
                    id: lesson.client.id,
                    name: lesson.client.fullname
                };
                data.teacher = {
                    id: lesson.teacher.id,
                    name: lesson.teacher.fullname
                };

                res.json({
                    ok: true,
                    data
                });
            })
            .catch(next);
    }
});

function map(lesson, user) {
    return lesson;
}