export default ({
    services: { Club, Checkout }
}) => ({
    async create(req, res) {
        const {
            contact,
            userId = req.user?.id,
            packId,
            meetingId,
            requestId,
            utm
        } = req.body;

        const payment = await Club.createPayment({
            contact,
            userId: contact ? undefined : userId,
            packId,
            meetingId,
            requestId,
            utm
        });

        res.json({
            ok: true,
            data: payment
        });
    },

    async process(req, res) {
        const { uuid } = req.body;

        const payment = await Checkout.resolvePayment(uuid);
        const result = await Club.processPayment(payment);

        res.json({
            ok: true,
            data: result
        });
    }
});