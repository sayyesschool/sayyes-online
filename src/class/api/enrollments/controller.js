module.exports = ({
    Enrollment
}) => ({
    getMany: (req, res, next) => {
        Enrollment.find({ teacher: req.user.id, ...req.query })
            .populate('learner', 'firstname lastname fullname email')
            .populate('courses', 'slug title subtitle image')
            .then(enrollments => {
                res.json({
                    ok: true,
                    data: enrollments
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Enrollment.findById(req.params.enrollmentId)
            .populate('learner', 'firstname lastname fullname')
            // .populate('clients', 'firstname lastname fullname')
            .populate('teacher', 'firstname lastname fullname')
            .populate('courses', 'title slug image units._id lessons._id exercises._id')
            .then(enrollment => {
                if (!enrollment) {
                    const error = new Error('Обучение не найдено');
                    error.status = 404;
                    return next(error);
                }

                const data = enrollment.toJSON();

                data.courses?.forEach(course => course.enrollmentId = enrollment.id);

                res.json({
                    ok: true,
                    data
                });
            })
            .catch(next);
    }
});