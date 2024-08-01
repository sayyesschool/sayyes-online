export default ({
    models: { Post }
}) => ({
    getMany: (req, res, next) => {
        Post.find({ ...req.query })
            .populate('author', 'firstname lastname email imageUrl')
            .populate('comments.author', 'firstname lastname email imageUrl')
            .sort({ createdAt: -1 })
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
        req.body.author = req.user.id;

        Post.create(req.body)
            .then(post => {
                post.author = req.user;

                res.json({
                    ok: true,
                    message: 'Пост создан',
                    data: post
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Post.findOneAndUpdate({
            _id: req.params.id,
            author: req.user.id
        }, req.body, {
            new: true,
            projection: Object.keys(req.body)
        })
            .then(post => {
                res.json({
                    ok: true,
                    message: 'Пост обновлен',
                    data: post
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Post.findOneAndDelete({
            _id: req.params.id,
            author: req.user.id
        })
            .then(post => {
                res.json({
                    ok: true,
                    message: 'Пост удален',
                    data: {
                        id: post.id
                    }
                });
            })
            .catch(next);
    },

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
                comments: { $elemMatch: { _id: req.params.commentId } }
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
    }
});