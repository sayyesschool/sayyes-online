export default ({
    models: { Learner }
}) => ({
    async get(req, res) {
        const learners = await Learner.find(req.query ?? {});

        res.json({
            ok: true,
            data: learners
        });
    },

    async getOne(req, res) {
        const learner = await Learner.findById(req.params.id)
            .populate({
                path: 'requests',
                select: 'status manager contact'
                // populate: { path: 'manager', select: 'firstname lastname' }
            })
            .populate('memberships')
            .populate({
                path: 'enrollments',
                select: 'status type domain format manager schedules'
                // populate: { path: 'manager', select: 'firstname lastname' }
            })
            .populate({
                path: 'transactions',
                populate: { path: 'enrollment', select: 'domain' }
            });

        res.json({
            ok: true,
            data: learner
        });
    },

    async create(req, res) {
        const learner = await Learner.create(req.body);

        res.json({
            ok: true,
            message: 'Ученик создан',
            data: learner
        });
    },

    async update(req, res) {
        const learner = await Learner.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        res.json({
            ok: true,
            message: 'Ученик изменен',
            data: learner
        });
    },

    async delete(req, res) {
        const learner = await Learner.findByIdAndDelete(req.params.id);

        res.json({
            ok: true,
            message: 'Ученик удален',
            data: {
                id: learner.id
            }
        });
    }
});