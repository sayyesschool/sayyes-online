const router = require('express').Router();

module.exports = ({
    models: { Enrollment, Lesson, Payment, Ticket, User }
}) => {
    router.post('/payments', async (req, res, next) => {
        const event = req.body.event;
        console.log(event);
        try {
            const payment = await Payment.findOneAndUpdate({ uuid: payment.id }, {
                status: payment.status,
                test: payment.test,
                method: payment.payment_method && {
                    id: payment.payment_method.id,
                    type: payment.payment_method.type,
                    title: payment.payment_method.title,
                    saved: payment.payment_method.saved,
                    card: payment.payment_method.card && {
                        number: payment.payment_method.card.last4,
                        type: payment.payment_method.card.card_type
                    }
                }
            }, { new: true });

            if (event === 'payment.succeeded') {
                const { metadata } = req.body.object;
                const user = await User.findById(metadata.userId);

                if (metadata.enrollmentId) {
                    const enrollment = await Enrollment.findById(metadata.enrollmentId);
                    const lessons = enrollment.createLessons(metadata.numberOfLessons);
                    await Lesson.create(lessons);
                } else if (metadata.ticketId) {
                    await Ticket.create({
                        user: user.id,
                        plan: metadata.planId,
                        payment: payment.id
                    });
                }
            } else if (event === 'refund.succeeded') {
                const refund = req.body.object;

                await Ticket.deleteOne({ 'payment.id': refund.payment_id });
            }

            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(500);
        }
    });

    return router;
};