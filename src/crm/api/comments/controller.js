export default ({
    models: { Comment }
}) => ({
    get: (req, res, next) => {
        Comment.find(req.query)
            .then(comments => {
                res.json({
                    ok: true,
                    data: comments
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Comment.findById(req.params.id)
            .then(comment => {
                res.json({
                    ok: true,
                    data: comment
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Comment.create(req.body)
            .then(comment => {
                comment.author = req.user;

                res.json({
                    ok: true,
                    message: 'Комментарий создан',
                    data: comment
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(comment => {
                res.json({
                    ok: true,
                    message: 'Комментарий изменен',
                    data: {
                        id: comment.id,
                        ref: comment.ref,
                        content: comment.content
                    }
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Comment.findByIdAndDelete(req.params.id)
            .select('id ref')
            .then(comment => {
                res.json({
                    ok: true,
                    message: 'Комментарий удален',
                    data: comment
                });
            })
            .catch(next);
    }
});