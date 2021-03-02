const router = require('express').Router();

module.exports = ({
    models: { Enrollment, Lesson, Payment, Ticket, User }
}) => {
    router.post('/payments', async (req, res, next) => {
        try {
            const { event, object } = req.body;

            const payment = await Payment.findOneAndUpdate({ uuid: object.id }, {
                status: object.status,
                test: object.test,
                method: object.payment_method && {
                    id: object.payment_method.id,
                    type: object.payment_method.type,
                    title: object.payment_method.title,
                    saved: object.payment_method.saved,
                    card: object.payment_method.card && {
                        number: object.payment_method.card.last4,
                        type: object.payment_method.card.card_type
                    }
                }
            }, { new: true });

            if (event === 'payment.succeeded') {
                const { metadata } = object;
                const user = await User.findById(metadata.clientId);

                if (metadata.enrollmentId) {
                    const enrollment = await Enrollment.findById(metadata.enrollmentId);
                    const lessons = enrollment.createLessons(Number.parseInt(metadata.numberOfLessons));
                    await Lesson.insertMany(lessons);
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
            console.error(error);
            res.sendStatus(500);
        }
    });

    return router;
};