module.exports = ({
    models: { Enrollment, Pack }
}) => ({
    getMany: (req, res, next) => {
        Promise.all([
            Enrollment.find({ client: req.user.id, ...req.query })
                .populate('client', 'firstname lastname imageUrl')
                .populate('teacher', 'firstname lastname imageUrl')
                .populate('lessons', 'id')
                .populate('currentPayment', 'status amount description'),
            Pack.find()
        ])
            .then(([enrollments, packs]) => {
                const data = enrollments.map(enrollment => enrollment.toJSON()).map(enrollment => {
                    if (enrollment.status === 'payment') {
                        const enrollmentPacks = packs.filter(pack =>
                            pack.age === enrollment.age &&
                            pack.domain === enrollment.domain &&
                            pack.lessonDuration === enrollment.lessonDuration
                        ).sort((a, b) => b.pricePerLesson - a.pricePerLesson);

                        const basePricePerLesson = enrollmentPacks[0].pricePerLesson;

                        enrollment.packs = enrollmentPacks.map(pack => pack.toJSON()).map(pack => {
                            pack.basePricePerLesson = basePricePerLesson;

                            return pack;
                        });
                    }

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
            .populate('teacher', 'firstname lastname imageUrl zoomUrl')
            .populate('manager', 'firstname lastname imageUrl email phone')
            .populate('courses', 'title subtitle slug image units.id lessons.id exercises.id')
            .populate('materials', 'slug title subtitle')
            .populate('lessons', 'id title date status')
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