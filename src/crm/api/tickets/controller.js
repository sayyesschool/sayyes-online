module.exports = ({
    models: { Ticket }
}) => ({
    get: (req, res, next) => {
        Ticket.find()
            .populate('user')
            .populate('meeting')
            .then(tickets => {
                res.json({
                    ok: true,
                    tickets: tickets.map(mapTicket)
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Ticket.findById(req.params.ticketId)
            .populate('user')
            .populate('meeting')
            .then(ticket => {
                res.json({
                    ok: true,
                    ticket: mapTicket(ticket)
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Ticket.create(req.body)
            .then(ticket => {
                res.json({
                    ok: true,
                    message: 'Билет создан',
                    ticket
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Ticket.findByIdAndUpdate(req.params.ticketId, req.body, { new: true })
            .then(ticket => {
                res.json({
                    ok: true,
                    message: 'Билет обновлен',
                    ticket
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Ticket.findByIdAndDelete(req.params.ticketId)
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Билет удален'
                });
            })
            .catch(next);
    }
});

function mapTicket(ticket) {
    const object = ticket.toObject();

    return {
        ...object,
        user: {
            id: ticket.user.id,
            fullname: ticket.user.fullname
        },
        meeting: ticket.meeting ? {
            id: ticket.meeting.id,
            title: ticket.meeting.title
        } : undefined
    };
}