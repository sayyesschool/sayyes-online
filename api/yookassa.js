const router = require('express').Router();

module.exports = ({ Enrollment, Lesson, Ticket, User }) => {
    router.post('/payments', async (req, res, next) => {
        const event = req.body.event;

        if (event === 'payment.succeeded') {
            const payment = req.body.object;
            const user = await User.findById(payment.metadata.userId);

            if (payment.metadata.enrollmentId) {
                Enrollment.findById(payment.metadata.enrollmentId)
                    .then(enrollment => {
                        const lessons = enrollment.createLessons(payment.metadata.packId);
                        return Lesson.create(lessons);
                    })
                    .then(() => {
                        res.sendStatus(200);
                    });
            } else if (payment.metadata.ticketId) {
                Ticket.create({
                    user: user.id,
                    plan: payment.metadata.planId,
                    payment: {
                        id: payment.id,
                        amount: payment.amount.value,
                        paid: payment.paid,
                        date: payment.captured_at
                    }
                }).then(() => {
                    res.sendStatus(200);
                });
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