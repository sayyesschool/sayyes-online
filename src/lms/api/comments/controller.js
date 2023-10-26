module.exports = ({
    models: { Comment }
}) => ({
    async get(req, res) {
        const comments = await Comment.find({ ...req.query })
            .populate('author', 'firstname lastname email imageUrl')
            .sort({ createdAt: -1 });

        res.json({
            ok: true,
            data: comments
        });
    },

    async create(req, res) {
        req.body.user = req.user.id;

        const comment = await Comment.findByIdAndUpdate(req.params.id, {
            $push: { comments: req.body }
        }, {
            new: true,
            projection: {
                id: true,
                slug: true,
                comments: { $slice: -1 }
            }
        }).populate('comments.user', 'firstname lastname email');

        const data = post.comments[0].toObject();

        data.postId = post.id;

        res.json({
            ok: true,
            data
        });
    },

    async update(req, res) {
        const data = Array.from(Object.entries(req.body))
            .reduce((data, [key, value]) => {
                data[`comments.$[c].${key}`] = value;
                return data;
            }, {});

        const comment = await Comment.findByIdAndUpdate(req.params.postId, {
            $set: data
        }, {
            new: true,
            arrayFilters: [{ 'c._id': req.params.commentId }],
            projection: {
                id: true,
                slug: true,
                comments: { $elemMatch: { _id: req.params.commentId } }
            }
        }).populate('comments.user', 'firstname lastname email');

        res.json({
            ok: true,
            message: 'Комментарий изменен',
            data: comment
        });
    },

    async delete(req, res) {
        const comment = await Comment.findByIdAndUpdate(req.params.postId, {
            $pull: {
                comments: { _id: req.params.commentId }
            }
        }, {
            projection: {
                comments: { $elemMatch: { _id: req.params.commentId } },
            }
        });

        const data = post.comments[0].toObject();

        data.postId = post.id;

        res.json({
            ok: true,
            message: 'Комментарий удален',
            data
        });
    },
});