export default ({
    models: { Request, User },
    services: { Club, Checkout }
}) => ({
    async create(req, res) {
        const {
            email,
            name,
            userId = req.user?.id,
            packId,
            meetingId,
            utm
        } = req.body ?? {};
        let requestId = req.body?.requestId;

        const pack = await Club.getPack(packId);

        if (!pack) throw {
            code: 404,
            message: 'Пакет не найден'
        };

        const user = await User.findOne({ $or: [{ _id: userId }, { email }] });

        if (userId && !user) throw {
            code: 404,
            message: 'Пользователь не найден'
        };

        if (!userId && !email) throw {
            code: 400,
            message: 'Не указан email'
        };

        const paymentRequest = await Request.create({
            type: Request.Type.Membership,
            contact: user ? undefined : {
                name,
                email
            },
            learnerId: user?.id,
            requestId,
            utm
        });

        if (requestId) {
            await Request.update(requestId, {
                status: Request.Status.Completed,
                learnerId: user?.id,
                requestId: paymentRequest.id
            });
        }

        const payment = await Checkout.createPayment({
            amount: pack.price,
            description: 'Покупка абонемента',
            confirmation: {
                type: 'embedded'
            },
            email: user?.email ?? email,
            metadata: {
                email: user ? undefined : email,
                name: user ? undefined : name,
                userId: user?.id,
                membershipPackId: pack.id,
                meetingId,
                requestId: paymentRequest.id
            }
        });

        res.json({
            ok: true,
            data: payment
        });
    },

    async process(req, res) {
        const { uuid } = req.body;

        const payment = await Checkout.resolvePayment(uuid);
        await Club.processPayment(payment);

        res.json({
            ok: true
        });
    }
});