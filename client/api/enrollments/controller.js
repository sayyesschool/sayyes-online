module.exports = ({
    models: { Enrollment }
}) => ({
    getMany: (req, res, next) => {
        Enrollment.find({ client: req.user.id, ...req.query })
            .populate('client', 'firstname lastname imageUrl')
            .populate('teacher', 'firstname lastname imageUrl')
            .populate('lessons', 'id trial')
            .populate('currentPayment', 'status amount description')
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
            .populate('teacher', 'firstname lastname imageUrl')
            .populate('manager', 'firstname lastname imageUrl email phone')
            .populate('courses', 'title subtitle slug image units.id lessons.id exercises.id')
            .populate('materials')
            .populate('lessons', 'id title date trial status')
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