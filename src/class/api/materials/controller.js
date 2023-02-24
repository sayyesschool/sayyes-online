module.exports = ({
    models: { Material }
}) => ({
    getMany: (req, res, next) => {
        Material.find()
            .then(materials => {
                res.json({
                    ok: true,
                    data: materials
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Material.findOne({ slug: req.params.slug })
            .then(material => {
                if (!material) {
                    const error = new Error('Материал не найден');
                    error.status = 404;
                    return next(error);
                }

                res.json({
                    ok: true,
                    data: material
                });
            })
            .catch(next);
    }
});