module.exports = ({ Enrollment }) => ({
    getMany: (req, res, next) => {
        Enrollment.find({ teacher: req.user.id, ...req.query })
            .populate('client', 'firstname lastname email')
            .then(enrollments => {
                res.json({
                    ok: true,
                    data: enrollments
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Enrollment.findById(req.params.id)
            .populate('client', 'firstname lastname email')
            .populate('teacher', 'firstname lastname email')
            .populate('manager', 'firstname lastname email')
            .populate('courses', 'title slug image units.id lessons.id exercises.id')
            .populate('materials', 'title slug image')
            .populate('assignments', 'id title')
            .populate('posts', 'id title')
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