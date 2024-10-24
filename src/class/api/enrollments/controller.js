export default ({
    Enrollment
}) => ({
    async getMany(req, res, next) {
        const enrollments = await Enrollment.find({ teacher: req.user.id, ...req.query })
            .populate('learner', 'firstname lastname fullname email')
            .populate('courses', 'slug title subtitle image');

        res.json({
            ok: true,
            data: enrollments
        });
    },

    async getOne(req, res, next) {
        const enrollment = await Enrollment.findById(req.params.enrollmentId)
            .populate('learner', 'firstname lastname fullname')
            .populate('teacher', 'firstname lastname fullname')
            .populate('courses', 'title slug image units._id lessons._id exercises._id');

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
    }
});