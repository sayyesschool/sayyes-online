export default ({
    models: { Enrollment }
}) => ({
    async getMany(req, res) {
        const query = { ...req.query };

        if (req.user.isLearner) {
            query.learnerId = req.user.id;
        } else {
            query.teacherId = req.user.id;
        }

        const enrollments = await Enrollment.find(query)
            .populate('learner', 'firstname lastname email imageUrl')
            .populate('teacher', 'firstname lastname email imageUrl');

        res.json({
            ok: true,
            data: enrollments
        });
    },

    async getOne(req, res, next) {
        const enrollment = await Enrollment.findById(req.params.id)
            .populate('learner', 'firstname lastname email image')
            .populate('teacher', 'firstname lastname image zoomUrl')
            .populate('manager', 'firstname lastname image email phone')
            .populate('lessons', 'title status date duration')
            .populate('assignments', 'title status dueAt')
            .populate('courses', 'title')
            .populate('materials', 'title');

        if (!enrollment) {
            const error = new Error('Обучение не найдено');
            error.status = 404;

            return next(error);
        }

        res.json({
            ok: true,
            data: enrollment
        });
    },

    async update(req, res) {
        const keys = Object.keys(req.body);

        const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, {
            projection: keys.join(' '),
            new: true
        });

        res.json({
            ok: true,
            message: 'Обучение изменено',
            data: enrollment
        });
    }
});