module.exports = ({
    models: { Assignment }
}) => ({
    getMany: (req, res, next) => {
        Assignment.find({ teacher: req.user.id, ...req.query })
            .populate('client', 'firstname lastname email')
            .then(assignments => {
                res.json({
                    ok: true,
                    data: assignments
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Assignment.findById(req.params.id)
            .populate('client', 'firstname lastname email')
            .then(assignment => {
                if (!assignment) {
                    const error = new Error('Задание не найдено');
                    error.status = 404;
                    return next(error);
                }

                res.json({
                    ok: true,
                    data: assignment
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Assignment.create(req.body)
            .then(assignment => {
                res.json({
                    ok: true,
                    message: 'Задание создано',
                    data: assignment
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(assignment => {
                res.json({
                    ok: true,
                    message: 'Задание обновлено',
                    data: assignment
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Assignment.findByIdAndDelete(req.params.id)
            .then(assignment => {
                res.json({
                    ok: true,
                    message: 'Задание удалено',
                    data: {
                        id: assignment.id
                    }
                });
            })
            .catch(next);
    }
});