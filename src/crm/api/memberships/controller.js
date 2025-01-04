export default ({
    models: { Membership }
}) => ({
    async get(req, res) {
        const memberships = await Membership.find(req.query)
            .populate('user', 'firstname lastname email');

        res.json({
            ok: true,
            data: memberships.map(m => m.toObject())
        });
    },

    async getOne(req, res) {
        const membership = await Membership.findById(req.params.id)
            .populate('user', 'firstname lastname email');

        res.json({
            ok: true,
            data: membership.toObject()
        });
    }
});