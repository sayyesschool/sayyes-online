module.exports = ({
    models: { Learner }
}) => ({
    get: (req, res, next) => {
        const query = req.query ? req.query : {};

        Learner.find(query)
            .then(learners => {
                res.json({
                    ok: true,
                    data: learners
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Learner.findById(req.params.id)
            .populate({
                path: 'requests',
                select: 'status manager contact',
                populate: { path: 'manager', select: 'firstname lastname' }
            })
            .populate({
                path: 'enrollments',
                select: 'status type domain format manager schedules',
                populate: { path: 'manager', select: 'firstname lastname' }
            })
            .populate({
                path: 'transactions',
                populate: { path: 'enrollment', select: 'domain' }
            })
            .then(learner => {
                res.json({
                    ok: true,
                    data: learner
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Learner.create(req.body)
            .then(learner => {
                res.json({
                    ok: true,
                    message: 'Ученик создан',
                    data: learner
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Learner.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(learner => {
                res.json({
                    ok: true,
                    message: 'Ученик изменен',
                    data: learner
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Learner.findByIdAndDelete(req.params.id)
            .then(learner => {
                res.json({
                    ok: true,
                    message: 'Ученик удален',
                    data: {
                        id: learner.id
                    }
                });
            })
            .catch(next);
    }
});