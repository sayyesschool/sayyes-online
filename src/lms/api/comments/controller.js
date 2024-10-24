export default ({
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
        req.body.authorId = req.user.id;

        const comment = await Comment.create(req.body);

        res.json({
            ok: true,
            message: 'Комментарий создан',
            data: comment
        });
    },

    async update(req, res) {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        res.json({
            ok: true,
            message: 'Комментарий изменен',
            data: comment
        });
    },

    async delete(req, res) {
        const comment = await Comment.findOneAndDelete({
            _id: req.params.id
        });

        res.json({
            ok: true,
            message: 'Комментарий удален',
            data: {
                id: comment.id,
                itemId: comment.itemId
            }
        });
    }
});