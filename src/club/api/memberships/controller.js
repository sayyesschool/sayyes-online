export default ({
    services: { Club }
}) => ({
    async getMany(req, res) {
        const memberships = await Club.findUserMemberships(req.user);

        res.json({
            ok: true,
            data: memberships
        });
    },

    async getOne(req, res) {
        const membership = req.params.id === 'my' ?
            await Club.findUserMembership(req.user) :
            await Club.getMembership(req.params.id);

        res.json({
            ok: true,
            data: membership
        });
    },

    async getOptions(req, res) {
        const options = await Club.getPacks();

        res.json({
            ok: true,
            data: options
        });
    }
});