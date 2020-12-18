const { isValidObjectId } = require('mongoose');

module.exports = ({ Course }) => ({
    getMany: (req, res, next) => {
        Course.find()
            .then(courses => {
                res.json({
                    ok: true,
                    data: courses
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        const key = isValidObjectId(req.params.course) ? '_id' : 'slug';

        Course.findOne({ [key]: req.params.course })
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