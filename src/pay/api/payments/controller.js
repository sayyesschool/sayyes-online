export default ({
    models: { Payment },
    services: { Checkout, Class, Club }
}) => ({
    async create(req, res) {
        let {
            amount,
            description,
            purpose,
            contact: customer,
            data,
            requestId,
            userId = req.user?.id,
            utm
        } = req.body;

        if (purpose === Payment.Purpose.Enrollment) {
            amount = await Class.getPackPrice(data.packId);
        } else if (purpose === Payment.Purpose.Membership) {
            amount = await Club.getPackPrice(data.packId);
        }

        const payment = await Checkout.createPayment({
            amount,
            description,
            purpose,
            customer,
            data,
            requestId,
            userId,
            utm
        });

        res.json({
            ok: true,
            data: payment
        });
    },

    async process(req, res) {
        const payment = await Checkout.processPayment(req.body.uuid);

        let data;

        if (payment.purpose === Payment.Purpose.Enrollment) {
            data = await Class.processPayment(payment);
        } else if (payment.purpose === Payment.Purpose.Membership) {
            data = await Club.processPayment(payment);
        }

        res.json({
            ok: true,
            data
        });
    }
});