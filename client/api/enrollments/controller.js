module.exports = ({ Enrollment }) => ({
    getMany: (req, res, next) => {
        Enrollment.find({ client: req.user.id, ...req.query })
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
            .populate('manager', 'firstname lastname fullname')
            .populate('teacher', 'firstname lastname fullname')
            .populate('courses', 'title slug image units.id lessons.id exercises.id')
            .populate('materials')
            .populate('lessons', 'id title date trial status')
            .populate('assignments', 'id title status createdAt dueAt')
            .populate('posts', 'id title createdAt')
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