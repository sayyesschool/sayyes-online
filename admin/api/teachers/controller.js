module.exports = ({
    models: { Teacher }
}) => ({
    get: (req, res, next) => {
        const query = req.query ? req.query : {};

        Teacher.find(query)
            .then(teachers => {
                res.json({
                    ok: true,
                    data: teachers
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Teacher.findById(req.params.id)
            .populate({
                path: 'enrollments',
                select: 'status type domain format client schedules',
                populate: { path: 'client', select: 'firstname lastname' }
            })
            .then(teacher => {
                res.json({
                    ok: true,
                    data: teacher
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Teacher.create(req.body)
            .then(teacher => {
                res.json({
                    ok: true,
                    message: 'Преподаватель создан',
                    data: teacher
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(teacher => {
                res.json({
                    ok: true,
                    message: 'Преподаватель изменен',
                    data: teacher
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Teacher.findByIdAndDelete(req.params.id)
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Преподаватель удален'
                });
            })
            .catch(next);
    }
});