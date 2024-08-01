export default ({
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

    async delete(req, res, next) { }
});