module.exports = ({
    models: { Enrollment },
}) => ({
    getMany: (req, res, next) => {
        const query = { ...req.query };

        if (req.user.role === 'client') {
            query.client = req.user.id;
        } else {
            query.teachers = req.user.id;
        }

        Enrollment.find(query)
            .populate('learner', 'firstname lastname email imageUrl')
            .populate('teacher', 'firstname lastname email imageUrl')
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
            .populate('learner', 'firstname lastname email imageUrl')
            .populate('teacher', 'firstname lastname imageUrl zoomUrl')
            .populate('manager', 'firstname lastname imageUrl email phone')
            .populate('lessons', 'title status date duration')
            .populate('assignments', 'title status dueAt')
            .populate('courses', 'title')
            .populate('materials', 'title')
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
    }
});