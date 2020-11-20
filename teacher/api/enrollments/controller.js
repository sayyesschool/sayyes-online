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
        Enrollment.get({ teacher: req.user.id, ...req.query })
            .populate('client', 'firstname lastname fullname email')
            .then(enrollments => {
                res.json({
                    ok: true,
                    data: enrollments
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

                res.json({
                    ok: true,
                    data: enrollment
                });
            })
            .catch(next);
    }
});