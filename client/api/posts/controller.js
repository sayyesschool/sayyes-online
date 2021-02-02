module.exports = ({
    models: { Post }
}) => ({
    getMany: (req, res, next) => {
        Post.find({ teacher: req.user.id, ...req.query })
            .populate('user', 'firstname lastname email')
            .then(posts => {
                res.json({
                    ok: true,
                    data: posts
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Post.findById(req.params.id)
            .populate('user', 'firstname lastname email imageUrl')
            .populate('comments.user', 'firstname lastname email imageUrl')
            .then(post => {
                if (!post) {
                    const error = new Error('Запись не найдена');
                    error.status = 404;
                    return next(error);
                }

                res.json({
                    ok: true,
                    data: post
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        req.body.user = req.user.id;

        Post.create(req.body)
            .then(post => {
                res.json({
                    ok: true,
                    message: 'Запись создана',
                    data: post
                });
            })
            .catch(next);
    },

    update: (req, res, next) => { },

    delete: (req, res, next) => { },

    createComment: (req, res, next) => {
        req.body.user = req.user.id;

        Post.findByIdAndUpdate(req.params.id, {
            $push: { comments: req.body }
        }, {
            new: true,
            projection: {
                id: true,
                slug: true,
                comments: { $slice: -1 }
            }
        })
            .populate('comments.user', 'firstname lastname email')
            .then(post => {
                const data = post.comments[0].toObject();

                data.postId = post.id;

                res.json({
                    ok: true,
                    data
                });
            }).catch(next);
    },

    updateComment: (req, res, next) => {
        const data = Array.from(Object.entries(req.body))
            .reduce((data, [key, value]) => {
                data[`comments.$[c].${key}`] = value;
                return data;
            }, {});

        Post.findByIdAndUpdate(req.params.postId, {
            $set: data
        }, {
            new: true,
            arrayFilters: [{ 'c._id': req.params.commentId }],
            projection: {
                id: true,
                slug: true,
                comments: { $elemMatch: { _id: req.params.commentId } }
            }
        })
            .populate('comments.user', 'firstname lastname email')
            .then(({ comments: [comment] }) => {
                res.json({
                    ok: true,
                    message: 'Комментарий изменен',
                    data: comment
                });
            }).catch(next);
    },

    deleteComment: (req, res, next) => {
        Post.findByIdAndUpdate(req.params.postId, {
            $pull: {
                comments: { _id: req.params.commentId }
            }
        }, {
            projection: {
                comments: { $elemMatch: { _id: req.params.commentId } },
            }
        }).then(post => {
            const data = post.comments[0].toObject();

            data.postId = post.id;

            res.json({
                ok: true,
                message: 'Комментарий удален',
                data
            });
        }).catch(next);
    },
});