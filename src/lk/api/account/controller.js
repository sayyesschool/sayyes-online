module.exports = () => ({
    getUser: (req, res, next) => {
        res.json({
            ok: true,
            data: map(req.user)
        });
    },

    increaseBalance: (req, res, next) => {
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

    updateProfile: (req, res, next) => {
        req.user.firstname = req.body.firstname;
        req.user.lastname = req.body.lastname;
        req.user.email = req.body.email;
        //req.user.avatar = req.file.buffer;

        req.user.save()
            .then(user => {
                res.json({
                    ok: true,
                    message: 'Профиль изменен',
                    data: map(user)
                });
            })
            .catch(next);
    },

    updatePassword: (req, res, next) => {
        if (!req.body.currentPassword) return next(new Error('Не указан текущий пароль'));
        if (!req.body.newPassword) return next(new Error('Не указан новый пароль'));
        if (!req.user.validatePassword(req.body.currentPassword)) return next(new Error('Неверный текущий пароль'));

        req.user.password = req.body.newPassword;

        req.user.save()
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Пароль изменен'
                });
            })
            .catch(next);
    }
});

function map(user) {
    return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        fullname: user.fullname,
        email: user.email,
        initials: user.initials,
        balance: user.balance,
        role: user.role
    };
}