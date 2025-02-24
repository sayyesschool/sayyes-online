export default ({
    models: { Payment },
    services: { Checkout, Class, Club }
}) => ({
    payments: async (req, res) => {
        const { type, event, object } = req.body ?? {};

        if (type !== 'notification') return res.sendStatus(200);

        try {
            if (event === 'payment.succeeded') {
                const payment = await Checkout.resolvePayment(object.id);

                if (payment.isProcessed) return res.sendStatus(200);

                const processedPayment = await Checkout.processPayment(req.body.uuid);

                if (processedPayment.purpose === Payment.Purpose.Enrollment) {
                    await Class.processPayment(processedPayment);
                } else if (processedPayment.purpose === Payment.Purpose.Membership) {
                    await Club.processPayment(processedPayment);
                }
            } else if (event === 'payment.canceled') {
                await Payment.update(object.id, {
                    status: object.status,
                    cancelation: object.cancellation_details
                });
            } else if (event === 'refund.succeeded') {
                await Payment.update(object.payment_id, { refunded: true });
            }

            res.sendStatus(200);
        } catch (error) {
            console.error(error);

            res.sendStatus(error.code || 500);
        }
    }
});