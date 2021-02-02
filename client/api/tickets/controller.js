module.exports = ({
    models: { Ticket }
}, mapTicket) => ({
    get: (req, res, next) => {
        return req.user.populate({ path: 'tickets', populate: 'meeting' })
            .execPopulate()
            .then(user => {
                res.json({
                    ok: true,
                    tickets: user.tickets.map(ticket => mapTicket(ticket))
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        return req.user.populate({ path: 'ticket', populate: 'meeting' })
            .execPopulate()
            .then(user => {
                res.json({
                    ok: true,
                    ticket: mapTicket(user.ticket)
                });
            })
            .catch(next);
    },

    buy: (req, res, next) => {
        return Ticket.purchase(req.user, 'single', req.body.meeting)
            .then(payment => {
                if (payment.confirmationUrl) {
                    res.redirect(payment.confirmationUrl);
                } else {
                    res.redirect('back');
                }
            })
            .catch(next);
    }
});