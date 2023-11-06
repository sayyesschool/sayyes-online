module.exports = ({
    models: { Course, Exercise }
}) => ({
    async getCourses(req, res) {
        const courses = await Course.find(req.query)
            .select('slug title image');

        res.json({
            ok: true,
            data: courses
        });
    },

    async getCourse(req, res) {
        const course = await Course.findById(req.params.course)
            .populate({
                path: 'progress',
                match: {
                    enrollmentId: req.query.enrollmentId
                }
            })
            .populate('exercises');

        const data = course.toJSON();

        data.enrollmentId = req.query.enrollmentId;

        res.json({
            ok: true,
            data
        });
    },

    async getExercise(req, res) {
        const exercise = await Exercise.findById(req.params.exercise);

        res.json({
            ok: true,
            data: exercise
        });
    }
});