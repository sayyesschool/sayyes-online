module.exports = ({
    models: { Assignment }
}) => ({
    getMany: (req, res, next) => {
        Assignment.find({ ...req.query })
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
            .populate('exercises')
            .then(assignment => {
                if (!assignment) {
                    const error = new Error('Задание не найдена');
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
        Assignment.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true,
            projection: Object.keys(req.body)
        })
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
        Assignment.findOneAndDelete({
            _id: req.params.id
        })
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