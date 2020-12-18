const router = require('express').Router();

module.exports = ({ Ticket, Meeting, User }) => {
    router.post('/payments', async (req, res, next) => {
        const event = req.body.event;

        if (event === 'payment.succeeded') {
            const payment = req.body.object;
            const user = await User.findById(payment.metadata.userId);
            const meeting = await Meeting.findById(payment.metadata.meetingId);

            const ticket = await Ticket.create({
                user: user.id,
                plan: payment.metadata.planId,
                payment: {
                    id: payment.id,
                    amount: payment.amount.value,
                    paid: payment.paid,
                    date: payment.captured_at
                }
            }).then(ticket => {
                res.sendStatus(200);
                return ticket;
            });

            if (meeting) {
                await Meeting.register(meeting, user, ticket);
            }
        } else if (event === 'refund.succeeded') {
            const refund = req.body.object;

            Ticket.deleteOne({ 'payment.id': refund.payment_id })
                .then(() => res.sendStatus(200))
                .catch(() => {
                    res.sendStatus(500);
                    next(error);
                });
        } else {
            res.sendStatus(200);
        }
    });

    return router;
};