export default ({
    models: { Progress }
}) => ({
    async upsert(req, res) {
        const progress = req.params.progressId ?
            await Progress.findByIdAndUpdate(req.params.progressId, {
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
    }
});