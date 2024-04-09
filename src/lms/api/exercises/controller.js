module.exports = ({
    models: { Exercise }
}) => ({
    async getExercise(req, res) {
        const exercise = await Exercise.findById(req.params.id).populate('comments');

        res.json({
            ok: true,
            data: exercise
        });
    }
});