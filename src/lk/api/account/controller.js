export default () => ({
    updateProfile: (req, res, next) => {
        req.user.firstname = req.body.firstname;
        req.user.lastname = req.body.lastname;
        req.user.patronym = req.body.patronym;
        req.user.phone = req.body.phone;
        req.user.dob = req.body.dob;
        req.user.timezone = req.body.timezone;
        req.user.zoom = req.body.zoom;
        req.user.skype = req.body.skype;
        req.user.telegram = req.body.telegram;

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