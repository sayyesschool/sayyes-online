module.exports = ({
    models: { Progress }
}) => ({
    async get(req, res, next) {
        const progress = await Progress.findOneById(req.params.progress);

        if (!progress) {
            const error = new Error('Прогресс не найден');
            error.status = 404;
            return next(error);
        }

        res.json({
            ok: true,
            data: progress
        });
    },

    async upsert(req, res) {
        const progress = req.params.progress ?
            await Progress.findByIdAndUpdate(req.params.progress, {
                $set: req.body
            }, {
                new: true
            })
            :
            await Progress.create(req.body);

        res.json({
            ok: true,
            message: 'Прогресс сохранен',
            data: progress
        });
    },

    async delete(req, res, next) { },

    async createExerciseComment(req, res) {
        const progress = await Progress.findOneAndUpdate({
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
        });

        const comment = progress.comments[0].toObject();

        res.json({
            ok: true,
            message: 'Комментарий создан',
            data: comment
        });
    },

    async updateExerciseComment(req, res) {
        const { comments: [comment] } = await Progress.findByIdAndUpdate({
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
        });

        res.json({
            ok: true,
            message: 'Комментарий изменен',
            data: comment
        });
    },

    async deleteExerciseComment(req, res) {
        const { comments: [comment] } = await Progress.findByIdAndUpdate({
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
        });

        res.json({
            ok: true,
            message: 'Комментарий удален',
            data: comment
        });
    }
});