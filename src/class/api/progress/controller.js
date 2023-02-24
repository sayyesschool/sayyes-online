module.exports = ({
    models: { Progress }
}) => ({
    get: (req, res, next) => {
        Progress.findOneById(req.params.progress)
            .then(progress => {
                if (!progress) {
                    const error = new Error('Прогресс не найден');
                    error.status = 404;
                    return next(error);
                }

                res.json({
                    ok: true,
                    data: progress
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        (!req.params.progress ?
            Progress.create(req.body) :
            Progress.findByIdAndUpdate(req.params.progress, {
                $set: req.body
            }, {
                new: true
            })
        ).then(progress => {
            res.json({
                ok: true,
                message: 'Прогресс сохранен',
                data: progress
            });
        }).catch(next);
    },

    delete: (req, res, next) => { }
});