module.exports = ({ Post }) => ({
    getMany: (req, res, next) => {
        Post.find({ teacher: req.user.id, ...req.query })
            .populate('client', 'firstname lastname email')
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
            .populate('client', 'firstname lastname email')
            .populate('teacher', 'firstname lastname email')
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
        Post.create(req.body)
            .then(post => {
                res.json({
                    ok: true,
                    message: 'Запись создана',
                    data: post
                });
            })
            .catch(next);
    }
});