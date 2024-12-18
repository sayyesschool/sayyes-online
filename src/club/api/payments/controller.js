export default ({
    models: { Payment, User },
    services: { Club, Checkout }
}) => ({
    async create(req, res) {
        const {
            email,
            name,
            userId = req.user?.id,
            packId,
            meetingId
        } = req.body ?? {};

        const pack = await Club.getPack(packId);

        if (!pack) throw {
            code: 404,
            message: 'Пакет не найден'
        };

        const user = await User.findOne({ $or: [{ _id: userId }, { email }] });
        const userEmail = user?.email ?? email;

        if (userId && !user) throw {
            code: 404,
            message: 'Пользователь не найден'
        };

        if (!userEmail) throw {
            code: 400,
            message: 'Не указан email'
        };

        const payment = await Checkout.createPayment({
            amount: pack.price,
            description: 'Покупка абонемента в разговорном клубе',
            confirmation: {
                type: 'embedded'
            },
            email: userEmail,
            metadata: {
                email: user ? undefined : email,
                name: user ? undefined : name,
                userId: user?.id,
                packId: pack.id,
                meetingId
            }
        });

        res.json({
            ok: true,
            data: payment
        });
    },

    async process(req, res) {
        const source = req.body.source;
        const event = req.body.event;
        const object = req.body.object;

        function processError(error) {
            if (source === 'client') {
                return res.status(error.code).send(error);
            } else {
                return res.sendStatus(200);
            }
        }

        function processSuccess(response = {}) {
            if (source === 'client') {
                return res.status(200).send({ ok: true, ...response });
            } else {
                return res.sendStatus(200);
            }
        }

        if (event === 'payment.succeeded') {
            const payment = await Checkout.resolvePayment(object.id);

            if (!payment) {
                return processError({ code: 404, message: 'Платеж не найден' });
            }

            if (!payment.paid) {
                return processError({ code: 400, message: 'Платеж не оплачен' });
            }

            const user = payment.metadata.userId ?
                await User.findOne({
                    $or: [
                        { _id: payment.metadata.userId },
                        { email: payment.metadata.email }
                    ]
                }) :
                await Club.registerUser({
                    name: payment.metadata.name,
                    email: payment.metadata.email
                });

            if (!user) {
                return processError({ code: 404, message: 'Пользователь не найден' });
            }

            if (!payment.userId) {
                await Payment.update(payment.id, { userId: user.id });
            }

            const membership = await Club.createMembership(user.id, payment.metadata.packId, payment.id);

            if (payment.metadata.meetingId) {
                const registration = await Club.registerForMeeting(user, payment.metadata.meetingId);

                return processSuccess({
                    data: registration,
                    message: 'Запись на встречу создана'
                });
            }

            return processSuccess({
                data: membership,
                message: 'Абонемент приобретен'
            });
        } else if (event === 'payment.canceled') {
            await Checkout.cancelPayment(object.id);
        } else if (event === 'refund.succeeded') {
            await Checkout.refundPayment(object.payment_id, { refunded: true });
        }

        res.sendStatus(200);
    }
});