export default ({
    models: { Membership }
}) => ({
    async get(req, res) {
        const memberships = await Membership.find(req.query)
            .populate('user', 'firstname lastname email');

        res.json({
            ok: true,
            data: memberships
        });
    },

    async getOne(req, res) {
        const membership = await Membership.findById(req.params.id)
            .populate('user', 'firstname lastname email');

        res.json({
            ok: true,
            data: membership
        });
    },

    async create(req, res) {
        const membership = await Membership.create(req.body);

        await membership.populate('user', 'firstname lastname email');

        res.json({
            ok: true,
            message: 'Абонемент создан',
            data: membership
        });
    },

    async update(req, res) {
        const membership = await Membership.update(req.params.id, req.body, { new: true });

        res.json({
            ok: true,
            message: 'Абонемент изменен',
            data: membership
        });
    },

    async delete(req, res) {
        const membership = await Membership.delete(req.params.id);

        res.json({
            ok: true,
            message: 'Абонемент удален',
            data: {
                id: membership.id
            }
        });
    }
});