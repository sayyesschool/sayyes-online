module.exports = ({
    Course
}) => ({
    getOne: (req, res, next) => {
        Course.findById(req.params.courseId)
            .populate({
                path: 'progress',
                match: {
                    enrollment: req.params.enrollmentId
                }
            })
            .then(course => {
                if (!course) {
                    const error = new Error('Курс не найден');
                    error.status = 404;
                    return next(error);
                }

                const data = course.toJSON();

                data.enrollmentId = req.params.enrollmentId;

                res.json({
                    ok: true,
                    data
                });
            })
            .catch(next);
    }
});