const { isValidObjectId } = require('mongoose');

module.exports = ({
    models: { Course }
}) => ({
    getOne: (req, res, next) => {
        const query = isValidObjectId(req.params.course) ?
            { _id: req.params.course } :
            { slug: req.params.course };

        Course.findOne(query)
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