module.exports = ({
    models: { Enrollment, Pack, Payment },
    services: { Checkout }
}) => ({
    getMany: (req, res, next) => {
        Promise.all([
            Enrollment.find({ client: req.user.id, ...req.query })
                .populate('learner', 'firstname lastname imageUrl')
                .populate('teacher', 'firstname lastname imageUrl')
                .populate('lessons', 'id')
                .populate('currentPayment', 'status amount description'),
            Pack.find()
        ])
            .then(([enrollments, packs]) => {
                const data = enrollments.map(enrollment => enrollment.toJSON()).map(enrollment => {
                    const enrollmentPacks = packs.filter(pack =>
                        pack.age === enrollment.age &&
                        pack.domain === enrollment.domain &&
                        pack.lessonDuration === enrollment.lessonDuration
                    ).sort((a, b) => b.pricePerLesson - a.pricePerLesson);

                    const basePricePerLesson = enrollmentPacks[0]?.pricePerLesson;

                    enrollment.packs = enrollmentPacks.map(pack => pack.toJSON()).map(pack => {
                        pack.basePricePerLesson = basePricePerLesson;

                        return pack;
                    });

                    return enrollment;
                });

                res.json({
                    ok: true,
                    data
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Enrollment.findById(req.params.id)
            .populate('teachers', 'firstname lastname imageUrl zoomUrl')
            .populate('managers', 'firstname lastname imageUrl email phone')
            .populate('lessons', 'title status date duration')
            .populate('courses', 'title subtitle slug image units.id lessons.id exercises.id')
            .populate('materials', 'slug title subtitle')
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

    pay: (req, res, next) => {
        Promise.all([
            Enrollment.findOne({ _id: req.params.id, client: req.user.id }),
            Pack.findById(req.body.packId)
        ]).then(([enrollment, pack]) => {
            if (!enrollment) return next({ code: 401, message: 'Обучение не найдено' });
            if (!pack) return next({ code: 401, message: 'Пакет не найден' });

            return Checkout.createPayment({
                amount: pack.price,
                description: `Оплата ${pack.numberOfLessons} занятий по 50 минут`,
                paymentMethod: req.body.usePaymentMethod ? user.paymentMethod : undefined,
                savePaymentMethod: req.body.savePaymentMethod,
                email: req.user.email,
                returnUrl: '/',
                metadata: {
                    enrollmentId: enrollment.id,
                    learnerId: enrollment.learnerId,
                    packId: pack.id
                }
            }).then(payment => {
                return Payment.create({
                    uuid: payment.id,
                    amount: payment.amount.value,
                    status: payment.status,
                    operator: 'yookassa',
                    description: payment.description,
                    confirmationUrl: payment.confirmationUrl,
                    test: payment.test,
                    user: req.user.id,
                    metadata: payment.metadata
                });
            });
        }).then(payment => {
            res.json({
                ok: true,
                data: payment
            });
        }).catch(next);
    }
});