const { isValidObjectId } = require('mongoose');

module.exports = ({
    models: { Course, Progress }
}) => ({
    getOne: (req, res, next) => {
        const key = isValidObjectId(req.params.course) ? '_id' : 'slug';

        Course.findOne({ [key]: req.params.course })
            .populate({
                path: 'progress',
                match: {
                    user: req.user.id
                }
            })
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
    },

    updateExerciseProgress: (req, res, next) => {
        const data = {
            user: req.user.id,
            course: req.params.course,
            exercise: req.params.exercise,
            state: req.body.state
        };

        if (typeof req.body.completed === 'boolean') {
            data.completed = req.body.completed;
        }

        Progress.findOneAndUpdate({
            user: req.user,
            exercise: req.params.exercise
        }, {
            $set: data
        }, {
            new: true,
            upsert: true
        }).then(progress => {
            res.json({
                ok: true,
                message: 'Статус упражнения изменен',
                data: {
                    id: progress.exercise,
                    courseId: progress.course,
                    isCompleted: progress.completed
                }
            });
        }).catch(next);
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