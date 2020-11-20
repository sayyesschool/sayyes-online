module.exports = ({ Material }) => ({
    get: (req, res, next) => {
        Material.get(req.query)
            .select('id title slug image')
            .then(materials => {
                res.json({
                    ok: true,
                    data: materials
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Material.getById(req.params.material)
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
        Material.update(req.params.material, req.body)
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
        Material.delete(req.params.material)
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