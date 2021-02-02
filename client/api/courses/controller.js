module.exports = ({
    models: { Course }
}) => ({
    getOne: (req, res, next) => {
        Course.findById(req.params.id)
            .then(course => {
                if (!course) {
                    const error = new Error('Курс не найден');
                    error.status = 404;
                    return next(error);
                }

                res.json({
                    ok: true,
                    data: course
                });
            })
            .catch(next);
    }
});