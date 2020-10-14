module.exports = ({ Enrollment }) => ({
    findOne: (req, res, next, id) => {
        Enrollment.getById(id)
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
        Enrollment.get({ client: req.user.id, ...req.query })
            .then(lessons => {
                res.json({
                    ok: true,
                    data: lessons.map(lesson => map(lesson, req.user))
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Enrollment.getById(req.params.id)
            .populate('client', 'firstname lastname fullname')
            .populate('teacher', 'firstname lastname fullname')
            .populate('courses', 'title slug image units.id lessons.id exercises.id')
            .then(enrollment => {
                if (!enrollment) {
                    const error = new Error('Обучение не найдно');
                    error.status = 404;
                    return next(error);
                }

                const data = enrollment.toJSON();

                data.client = enrollment.client && {
                    id: enrollment.client.id,
                    name: enrollment.client.fullname
                };
                data.teacher = enrollment.teacher && {
                    id: enrollment.teacher.id,
                    name: enrollment.teacher.fullname,
                    initials: enrollment.teacher.initials
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