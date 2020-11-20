module.exports = ({ Enrollment }) => ({
    findOne: (req, res, next, id) => {
        Enrollment.getById(id)
            .then(enrollment => {
                if (!lesson) {
                    const error = new Error('Обучение не найдено');
                    error.status = 404;
                    return next(error);
                }

                req.enrollment = enrollment;

                next();
            })
            .catch(next);
    },

    getMany: (req, res, next) => {
        Enrollment.get({ client: req.user.id, ...req.query })
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
            .populate('materials', 'title slug image')
            .then(enrollment => {
                if (!enrollment) {
                    const error = new Error('Обучение не найдено');
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