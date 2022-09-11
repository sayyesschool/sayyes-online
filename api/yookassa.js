const router = require('express').Router();

module.exports = ({
    models: { Client, Enrollment, Lesson, Pack, Payment, Transaction }
}) => {
    router.post('/payments', async (req, res) => {
        try {
            const { type, event, object } = req.body;

            if (type !== 'notification') return res.sendStatus(200);

            const transaction = await Transaction.findOne({ paymentId: object.id });

            if (transaction) return res.sendStatus(200);

            if (event === 'payment.succeeded') {
                const transaction = await Transaction.create({
                    type: 'debit',
                    amount: object.amount.value,
                    currency: object.amount.currency,
                    description: object.description,
                    payment: {
                        id: object.id,
                        gateway: 'yookassa',
                        method: object.payment_method && {
                            id: object.payment_method.id,
                            type: object.payment_method.type,
                            title: object.payment_method.title,
                            saved: object.payment_method.saved,
                            card: object.payment_method.card && {
                                type: object.payment_method.card.card_type,
                                first6: object.payment_method.card.first6,
                                last4: object.payment_method.card.last4,
                                expiryMonth: object.payment_method.card.expiry_month,
                                expiryYear: object.payment_method.card.expiry_year,
                                issuerName: object.payment_method.card.issuer_name,
                                issuerCountry: object.payment_method.card.issuer_country
                            }
                        }
                    },
                    user: object.metadata.userId,
                    enrollment: object.metadata.enrollmentId
                });

                await Client.updateOne({
                    _id: transaction.user
                }, {
                    $inc: {
                        balance: transaction.amount
                    }
                });

                if (object.metadata.enrollmentId && object.metadata.packId) {
                    const [enrollment, pack] = await Promise.all([
                        Enrollment.findById(object.metadata.enrollmentId),
                        Pack.findById(object.metadata.packId)
                    ]);

                    const lessons = enrollment.scheduleLessons(pack.numberOfLessons);

                    await Promise.all([
                        Transaction.create({
                            type: 'credit',
                            amount: transaction.amount,
                            currency: transaction.currency,
                            user: transaction.user,
                            enrollment: transaction.enrollment
                        }),
                        Enrollment.updateOne({ _id: enrollment.id }, { lessonPrice: pack.lessonPrice }),
                        Lesson.insertMany(lessons)
                    ]);
                }
            } else if (event === 'payment.canceled') {
                await Payment.updateOne({ uuid: object.id }, {
                    status: object.status,
                    method: paymentMethod,
                    cancellationDetails: object.cancellation_details
                });
            } else if (event === 'refund.succeeded') {

            }

            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });

    return router;
};