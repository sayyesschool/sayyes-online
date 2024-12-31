import { Router } from 'express';

export default ({
    models: { Enrollment, Lesson, Pack, Payment, Transaction, User },
    services: { Club }
}) => {
    const router = Router();

    router.post('/payments', async (req, res) => {
        const { type, source, event, object } = req.body ?? {};

        if (type !== 'notification') return res.sendStatus(200);

        try {
            const payment = await Payment.resolve(object.id);
            const transaction = await Transaction.findOne({ paymentId: object.id });

            if (transaction) return res.sendStatus(200);

            if (event === 'payment.succeeded') {
                if (payment.metadata.membershipOptionId) {
                    const { data, message } = Club.processPayment(payment);

                    if (source === 'client') {
                        return res.status(200).send({ ok: true, data, message });
                    } else {
                        return res.sendStatus(200);
                    }
                }

                if (object.metadata.enrollmentId && object.metadata.packId) {
                    const [enrollment, pack] = await Promise.all([
                        Enrollment.findById(object.metadata.enrollmentId),
                        Pack.findById(object.metadata.packId)
                    ]);

                    const transaction = await Transaction.create({
                        type: 'debit',
                        amount: object.amount.value,
                        currency: object.amount.currency,
                        description: object.description,
                        paymentId: payment.id,
                        enrollmentId: enrollment.id,
                        userId: payment.metadata.userId
                    });

                    const lessons = enrollment.scheduleLessons(pack.numberOfLessons);

                    await Promise.all([
                        Transaction.create({
                            type: 'credit',
                            amount: transaction.amount,
                            currency: transaction.currency,
                            user: transaction.user,
                            enrollment: transaction.enrollment
                        }),
                        Enrollment.updateOne({
                            _id: enrollment.id
                        }, {
                            lessonPrice: pack.lessonPrice
                        }),
                        Lesson.insertMany(lessons)
                    ]);
                }
            } else if (event === 'payment.canceled') {
                await Payment.updateOne({ uuid: object.id }, {
                    status: object.status,
                    // method: paymentMethod,
                    cancellationDetails: object.cancellation_details
                });
            } else if (event === 'refund.succeeded') {
                await Payment.update({ uuid: object.payment_id }, { refunded: true });
            }

            res.sendStatus(200);
        } catch (error) {
            console.error(error);

            if (source === 'client') {
                return res.status(error.code).send(error);
            } else {
                return res.sendStatus(500);
            }
        }
    });

    return router;
};