export default ({
    services: { Auth, Club, Meeting, Payment, User }
}) => ({
    async create(req, res) {
        const {
            meetingId,
            packId,
            userId,
            email
        } = req.body;

        const pack = await Club.getPack(packId);

        if (!pack) throw new Error('Pack not found');

        const user = await User.findOne({ $or: [{ _id: userId }, { email }] });

        if (userId && !user) throw new Error('User not found');

        if (!email) throw new Error('Email is required');

        const payment = await Payment.make({
            amount: pack.price,
            description: pack.description,
            confirmation: {
                type: 'embedded'
            },
            email,
            metadata: {
                meetingId,
                packId: pack.id,
                userId: user?.id,
                email: user ? undefined : email
            }
        });

        res.json(payment);
    },

    async process(req, res) {
        const event = req.body.event;
        const object = req.body.object;

        if (event === 'payment.succeeded') {
            const payment = await Payment.resolve(object.id);

            if (!payment || !payment.paid) return res.sendStatus(200);

            const user = await (object.metadata.userId ?
                User.findOne({
                    $or: [
                        { _id: object.metadata.userId },
                        { email: object.metadata.email }
                    ]
                }) : Club.registerMember({
                    email: object.metadata.email
                }));

            if (!user) return res.sendStatus(200);

            await Club.createTicket(payment.userId, payment.metadata.packId);

            if (object.metadata.meetingId) {
                Club.registerForMeeting(user, object.metadata.meetingId);
            }
        } else if (event === 'payment.canceled') {
            await Payment.delete({ uuid: object.id });
        } else if (event === 'refund.succeeded') {
            await Payment.update({ uuid: object.payment_id }, { refunded: true });
        }

        res.sendStatus(200);
    }
});