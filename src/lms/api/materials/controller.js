module.exports = ({
    models: { Material }
}) => ({
    async get(req, res) {
        const materials = await Material.find(req.query)
            .select('id slug title subtitle image');

        res.json({
            ok: true,
            data: materials
        });
    },

    async getOne(req, res) {
        const material = await Material.findById(req.params.material);

        res.json({
            ok: true,
            data: material
        });
    },

    async create(req, res) {
        const material = await Material.create(req.body);

        res.json({
            ok: true,
            message: 'Материал создан',
            data: material
        });
    },

    async update(req, res) {
        const material = await Material.findByIdAndUpdate(req.params.material, req.body, { new: true });

        res.json({
            ok: true,
            message: 'Материал изменен',
            data: material
        });
    },

    async delete(req, res) {
        const material = await Material.findByIdAndDelete(req.params.material)
            .select('id');

        res.json({
            ok: true,
            message: 'Материал удален',
            data: material
        });
    }
});