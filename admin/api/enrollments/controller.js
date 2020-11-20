module.exports = ({ Enrollment }) => ({
    get: (req, res, next) => {
        Enrollment.get(req.query)
            .select('-messages')
            .populate('manager', 'firstname lastname')
            .populate('client', 'firstname lastname')
            .populate('lessons', 'status')
            .sort({ createdAt: 1 })
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
            .populate('manager', 'firstname lastname')
            .populate('client', 'firstname lastname')
            .populate('teacher', 'firstname lastname')
            .populate({ path: 'lessons', populate: { path: 'teacher', select: 'firstname lastname' } })
            .populate('payments')
            .populate('courses', 'slug title image')
            .then(enrollment => {
                res.json({
                    ok: true,
                    data: enrollment
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Enrollment.create(req.body)
            .then(enrollment => {
                res.json({
                    ok: true,
                    message: 'Обучение создано',
                    data: enrollment
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Enrollment.update(req.params.id, req.body)
            .populate('manager', 'firstname lastname')
            .populate('client', 'firstname lastname')
            .populate('teacher', 'firstname lastname')
            .then(enrollment => {
                res.json({
                    ok: true,
                    message: 'Обучение изменено',
                    data: enrollment
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Enrollment.delete(req.params.id)
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Обучение удалено',
                    data: {
                        id: req.params.id
                    }
                });
            })
            .catch(next);
    }
});