export default ({
    models: { Course, Progress }
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
        const [course, progress] = await Promise.all([
            Course.findById(req.params.course).populate('exercises', '-items -notes'),
            Progress.find({ enrollmentId: req.query.enrollmentId }, '-state')
        ]);

        const data = course.toJSON();

        data.exercises = data.exercises.map(exercise => {
            const progressData = progress.find(({ exerciseId }) => exerciseId == exercise.id);

            return {
                ...exercise,
                completed: progressData ? progressData.completed : false,
                checked: progressData ? progressData.checked : false,
                partiallyLoaded: true,
                progress: progressData ? {
                    ...progressData.toJSON()
                } : {}
            };
        });

        data.enrollmentId = req.query.enrollmentId;

        res.json({
            ok: true,
            data
        });
    }
});