module.exports = ({
    models: { Course }
}) => ({
    getMany: (req, res, next) => {
        Course.find()
            .select('slug title image')
            .then(courses => {
                res.json({
                    ok: true,
                    data: courses
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Course.findById(req.params.id)
            .populate({
                path: 'progress',
                match: {
                    enrollment: req.query.enrollmentId
                }
            })
            .then(course => {
                if (!course) {
                    const error = new Error('Курс не найден');
                    error.status = 404;
                    return next(error);
                }

                const data = course.toJSON();

                data.enrollmentId = req.query.enrollmentId;

                res.json({
                    ok: true,
                    data
                });
            })
            .catch(next);
    },

    createExerciseComment: (req, res, next) => {
        Progress.findOneAndUpdate({
            user: req.user,
            exercise: req.params.exercise
        }, {
            $push: {
                comments: req.body
            }
        }, {
            new: true,
            upsert: true,
            projection: {
                exercise: true,
                comments: { $slice: -1 }
            }
        }).then(progress => {
            const comment = progress.comments[0].toObject();

            res.json({
                ok: true,
                message: 'Комментарий создан',
                data: comment
            });
        }).catch(next);
    },

    updateExerciseComment: (req, res, next) => {
        Progress.findByIdAndUpdate({
            user: req.user,
            exercise: req.params.exercise
        }, {
            $set: {
                'comments.$[c]': req.body
            }
        }, {
            new: true,
            arrayFilters: [{ 'c._id': req.params.comment }],
            projection: {
                id: true,
                exercise: true,
                comments: { $elemMatch: { _id: req.params.comment } }
            }
        }).then(({ comments: [comment] }) => {
            res.json({
                ok: true,
                message: 'Комментарий изменен',
                data: comment
            });
        }).catch(next);
    },

    deleteExerciseComment: (req, res, next) => {
        Progress.findByIdAndUpdate({
            user: req.user,
            exercise: req.params.exercise
        }, {
            $pull: {
                comments: { _id: req.params.comment }
            }
        }, {
            projection: {
                exercise: true,
                comments: { $elemMatch: { _id: req.params.comment } }
            }
        }).then(({ comments: [comment] }) => {
            res.json({
                ok: true,
                message: 'Комментарий удален',
                data: comment
            });
        }).catch(next);
    }
});