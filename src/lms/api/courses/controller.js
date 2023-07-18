module.exports = ({
    models: { Course, Exercise }
}) => ({
    getCourses: async (req, res) => {
        const courses = await Course.find(req.query)
            .select('slug title image');

        res.json({
            ok: true,
            data: courses
        });
    },

    getCourse: async (req, res) => {
        const course = await Course.findById(req.params.course)
            .populate('exercises');

        const data = course.toJSON();

        data.enrollmentId = req.query.enrollmentId;

        res.json({
            ok: true,
            data
        });
    },

    getExercise: async (req, res) => {
        const exercise = await Exercise.findById(req.params.exercise);

        res.json({
            ok: true,
            data: exercise
        });
    }
});