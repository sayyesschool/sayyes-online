export default ({
    models: { Exercise }
}) => ({
    async getExercise(req, res) {
        const exercise = await Exercise.findById(req.params.id);

        res.json({
            ok: true,
            data: exercise
        });
    }
});