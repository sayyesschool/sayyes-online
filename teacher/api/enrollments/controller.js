module.exports = ({ Enrollment }) => ({
    getMany: (req, res, next) => {
        Enrollment.find({ teachers: req.user.id, ...req.query })
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
            .populate('manager', 'firstname lastname email')
            .populate('lessons')
            .populate('posts', 'id title')
            .populate('courses', 'title slug image')
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
    },

    update: (req, res, next) => {
        const keys = Object.keys(req.body);

        Enrollment.findByIdAndUpdate(req.params.id, req.body, {
            projection: keys.join(' '),
            new: true
        }).then(enrollment => {
            res.json({
                ok: true,
                message: 'Обучение изменено',
                data: enrollment
            });
        }).catch(next);
    },
});