export default ({
    models: { Ticket }
}) => ({
    async get(req, res) {
        const tickets = await Ticket.find()
            .populate('user', 'firstname lastname email');

        res.json({
            ok: true,
            data: tickets.map(map)
        });
    },

    async getOne(req, res) {
        const ticket = await Ticket.findById(req.params.id)
            .populate('user', 'firstname lastname email');

        res.json({
            ok: true,
            data: map(ticket)
        });
    }
});

function map(ticket) {
    return ticket.toObject();
}