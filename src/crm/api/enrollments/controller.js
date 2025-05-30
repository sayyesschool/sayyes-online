export default ({
    models: { Enrollment, Lesson, Transaction }
}) => ({
    get: (req, res, next) => {
        Enrollment.find(req.query)
            .select('-messages')
            .populate('learner', 'firstname lastname')
            .populate('manager', 'firstname lastname')
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
            .populate('learner', 'hhid firstname lastname imageUrl')
            .populate('manager', 'firstname lastname imageUrl')
            .populate('teacher', 'firstname lastname imageUrl')
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
        // TODO: Fix keys
        // const keys = Object.keys(req.body);
        console.log(999, req.body);

        const data = {
            ...req.body,
            info: {
                purpose: req.body.purpose,
                experience: req.body.experience,
                preferences: req.body.preferences,
                note: req.body.note
            }
        };

        const query = Enrollment.findByIdAndUpdate(req.params.id, data, {
            // projection: keys.join(' '),
            new: true
        });

        // if (keys.includes('learner')) {
        //     query.populate('learner', 'firstname lastname');
        // }

        // if (keys.includes('managers')) {
        //     query.populate('managers', 'firstname lastname imageUrl');
        // }

        // if (keys.includes('teachers')) {
        //     query.populate('teachers', 'firstname lastname imageUrl');
        // }

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
    },

    getRefundLessons: (req, res, next) => {
        Lesson.find({
            status: 'scheduled',
            enrollment: req.params.id
        }).then(lessons => {
            res.json({
                ok: true,
                data: lessons
            });
        }).catch(next);
    },

    refundLessons: (req, res, next) => {
        Promise.all([
            Enrollment.findById(req.params.id),
            Lesson.deleteMany({ _id: { $in: req.body.lessonIds } })
        ]).then(([enrollment, result]) => {
            const amountToReturn = enrollment.lessonPrice * result.deletedCount;

            return Transaction.create({
                type: 'debit',
                amount: amountToReturn,
                currency: 'RUB',
                description: 'Возврат денежных средств за уроки',
                user: enrollment.learner,
                enrollment: enrollment.id
            });
        }).then(transaction => {
            res.json({
                ok: true,
                message: `На баланс клиента было переведено ${transaction.amount} руб.`,
                data: {
                    transaction,
                    lessonIds: req.body.lessonIds
                }
            });
        }).catch(next);
    }
});