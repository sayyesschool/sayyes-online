export default ({
    services: { Payment }
}) => ({
    async updateProfile(req, res) {
        const { firstname, lastname, patronym, phone, dob, timezone, accounts } = req.body;

        if (firstname)
            req.user.firstname = firstname;
        if (lastname)
            req.user.lastname = lastname;
        if (patronym)
            req.user.patronym = patronym;
        if (phone)
            req.user.phone = phone;
        if (dob)
            req.user.dob = dob;
        if (timezone)
            req.user.timezone = timezone;
        if (accounts)
            req.user.accounts = accounts;

        const user = await req.user.save();

        res.json({
            ok: true,
            message: 'Профиль сохранен',
            data: user.toData()
        });
    },

    async increaseBalance(req, res, next) {
        Payment.make({
            amount: req.body.amount,
            description: 'Пополнение баланса',
            email: req.user.email,
            returnUrl: req.body.meetingId && `/meetings/${req.body.meetingId}`,
            metadata: {
                userId: req.user.id,
                meetingId: req.body.meetingId
            }
        }).then(payment => {
            if (payment.confirmationUrl) {
                return res.redirect(payment.confirmationUrl);
            }

            res.json({
                ok: true,
                data: payment
            });
        }).catch(next);
    },

    async updateAvatar(req, res) {
        req.user.image = req.body.image;

        const user = await req.user.save();

        res.json({
            ok: true,
            message: 'Аватар обновлён',
            data: {
                image: user.image
            }
        });
    },

    async updatePassword(req, res) {
        if (!req.body.currentPassword)
            throw new Error('Не указан текущий пароль');
        if (!req.body.newPassword)
            throw new Error('Не указан новый пароль');
        if (!req.user.validatePassword(req.body.currentPassword))
            throw new Error('Неверный текущий пароль');

        req.user.password = req.body.newPassword;

        await req.user.save();

        res.json({
            ok: true,
            message: 'Пароль изменен'
        });
    }
});