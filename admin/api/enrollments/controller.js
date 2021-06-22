module.exports = ({
    models: { Enrollment, Lesson }
}) => ({
    get: (req, res, next) => {
        Enrollment.find(req.query)
            .select('-messages')
            .populate('client', 'firstname lastname')
            .populate('managers', 'firstname lastname')
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
            .populate('client', 'hhid firstname lastname imageUrl')
            .populate('managers', 'firstname lastname imageUrl')
            .populate('teachers', 'firstname lastname imageUrl')
            .populate('payments')
            .populate('lessons')
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
        req.body.managers = [req.user.id];

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
            new: true
        });

        if (keys.includes('client')) {
            query.populate('client', 'firstname lastname');
        }

        if (keys.includes('managers')) {
            query.populate('managers', 'firstname lastname imageUrl');
        }

        if (keys.includes('teachers')) {
            query.populate('teachers', 'firstname lastname imageUrl');
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
        Enrollment.findByIdAndUpdate(req.params.id)
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
    },

    updateSchedule: (req, res, next) => {
        Enrollment.findByIdAndUpdate(req.params.id, {
            schedule: req.body.schedule
        }, {
            new: true,
            projection: { schedule: true }
        })
            .then(enrollment => {
                if (!req.body.lessons) {
                    return res.json({
                        ok: true,
                        message: 'Расписание изменено',
                        data: enrollment
                    });
                }

                const ops = req.body.lessons.map(lesson => ({
                    updateOne: {
                        filter: { _id: lesson.id },
                        update: { $set: { date: lesson.date } }
                    }
                }));

                return Lesson.bulkWrite(ops)
                    .then(() => Lesson.find({
                        enrollment: enrollment.id,
                        date: { $gte: req.body.startDate }
                    }))
                    .then(lessons => {
                        res.json({
                            ok: true,
                            message: 'Уроки изменены',
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