export default ({
    models: { Material }
}) => ({
    get: (req, res, next) => {
        Material.find(req.query)
            .select('id slug title subtitle image')
            .then(materials => {
                res.json({
                    ok: true,
                    data: materials
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Material.findById(req.params.material)
            .then(material => {
                res.json({
                    ok: true,
                    data: material
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Material.create(req.body)
            .then(material => {
                res.json({
                    ok: true,
                    message: 'Материал создан',
                    data: material
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Material.findByIdAndUpdate(req.params.material, req.body, { new: true })
            .then(material => {
                res.json({
                    ok: true,
                    message: 'Материал изменен',
                    data: material
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Material.findByIdAndDelete(req.params.material)
            .select('id')
            .then(material => {
                res.json({
                    ok: true,
                    message: 'Материал удален',
                    data: material
                });
            })
            .catch(next);
    }
});