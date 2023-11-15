module.exports = () => ({
    get: (req, res, next) => {
        const query = { ...req.query };
        const page = req.query.page || 0;
        const limit = 100;
        const skip = page * limit;

        if (query.search) {
            const regex = new RegExp(req.query.search.trim(), 'i');

            query.$or = [
                { firstname: regex },
                { lastname: regex },
                { email: regex }
            ];

            delete query.search;
        }

        User.get(query)
            .select('firstname lastname email role createdAt')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .then(users => {
                res.json({
                    ok: true,
                    data: users
                });
            })
            .catch(next);
    },

    getUser: (req, res, next) => {
        res.json({
            ok: true,
            data: {
                id: req.user.id,
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                fullname: req.user.fullname,
                email: req.user.email,
                initials: req.user.initials,
                role: req.user.role
            }
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
        role: user.role
    };
}