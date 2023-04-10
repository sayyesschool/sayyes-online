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

    delete: (req, res, next) => { },

    createExerciseComment: (req, res, next) => {
        Progress.findOneAndUpdate({
            user: req.user,
            exercise: req.params.exercise
        }, {
            $push: {
                comments: req.body
            }
        }, {
            new: true,
            upsert: true,
            projection: {
                exercise: true,
                comments: { $slice: -1 }
            }
        }).then(progress => {
            const comment = progress.comments[0].toObject();

            res.json({
                ok: true,
                message: 'Комментарий создан',
                data: comment
            });
        }).catch(next);
    },

    updateExerciseComment: (req, res, next) => {
        Progress.findByIdAndUpdate({
            user: req.user,
            exercise: req.params.exercise
        }, {
            $set: {
                'comments.$[c]': req.body
            }
        }, {
            new: true,
            arrayFilters: [{ 'c._id': req.params.comment }],
            projection: {
                id: true,
                exercise: true,
                comments: { $elemMatch: { _id: req.params.comment } }
            }
        }).then(({ comments: [comment] }) => {
            res.json({
                ok: true,
                message: 'Комментарий изменен',
                data: comment
            });
        }).catch(next);
    },

    deleteExerciseComment: (req, res, next) => {
        Progress.findByIdAndUpdate({
            user: req.user,
            exercise: req.params.exercise
        }, {
            $pull: {
                comments: { _id: req.params.comment }
            }
        }, {
            projection: {
                exercise: true,
                comments: { $elemMatch: { _id: req.params.comment } }
            }
        }).then(({ comments: [comment] }) => {
            res.json({
                ok: true,
                message: 'Комментарий удален',
                data: comment
            });
        }).catch(next);
    }
});