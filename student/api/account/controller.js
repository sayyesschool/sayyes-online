module.exports = (services, mapAccount) => ({
    getAccount: (req, res, next) => {
        res.json({
            ok: true,
            account: mapAccount(req.user)
        });
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
                    account: mapAccount(user)
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