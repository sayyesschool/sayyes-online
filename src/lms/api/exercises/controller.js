export default ({
    models: { Exercise }
}) => ({
    async getExercise(req, res) {
        const exercise = await Exercise.findById(req.params.id).populate({
            path: 'progress',
            match: { enrollmentId: req.query.enrollmentId }
        });

        res.json({
            ok: true,
            data: exercise
        });
    }
});