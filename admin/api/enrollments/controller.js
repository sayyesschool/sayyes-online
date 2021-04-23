module.exports = ({
    models: { Enrollment, Lesson }
}) => ({
    get: (req, res, next) => {
        Enrollment.find(req.query)
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
        Enrollment.findById(req.params.id)
            .populate('manager', 'firstname lastname imageUrl')
            .populate('client', 'hhid firstname lastname imageUrl')
            .populate('teacher', 'firstname lastname imageUrl')
            .populate('payments')
            .populate({
                path: 'lessons',
                populate: {
                    path: 'teacher',
                    select: 'firstname lastname imageUrl'
                }
            })
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'firstname lastname imageUrl'
                }
            })
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
        const keys = Object.keys(req.body);
        const query = Enrollment.findByIdAndUpdate(req.params.id, req.body, {
            projection: keys.join(' '),
            new: true,
            lean: true
        });

        if (keys.includes('client')) {
            query.populate('client', 'firstname lastname');
        } else if (keys.includes('manager')) {
            query.populate('manager', 'firstname lastname');
        } else if (keys.includes('teacher')) {
            query.populate('teacher', 'firstname lastname');
        }

        query.then(enrollment => {
            res.json({
                ok: true,
                message: 'Обучение изменено',
                data: enrollment
            });
        }).catch(next);
    },

    delete: (req, res, next) => {
        Enrollment.findByIdAndDelete(req.params.id)
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
    },

    createLessons: (req, res, next) => {
        Enrollment.findById(req.params.id)
            .then(enrollment => {
                const lessons = enrollment.scheduleLessons(req.body.quantity, req.body.startDate);

                Lesson.create(lessons)
                    .then(lessons => {
                        res.json({
                            ok: true,
                            message: 'Уроки созданы',
                            data: {
                                enrollmentId: enrollment.id,
                                lessons
                            }
                        });
                    });
            })
            .catch(next);
    }
});