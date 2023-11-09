const strategies = require('./strategies');

module.exports = ({
    services: { Auth }
}) => ({
    user: (req, res) => {
        const user = req.user;

        res.json({
            ok: true,
            data: user ? {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                fullname: user.fullname,
                email: user.email,
                initials: user.initials,
                balance: user.balance,
                role: user.role
            } : null
        });
    },
    
    register: (req, res, next) => {
        Auth.register({
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })
            .then(user => {
                req.session.userId = user.id;
                next();
            })
            .catch(error => {
                req.flash('error', error.message || error);
                res.redirect('back');
            });
    },

    login: (req, res, next) => {
        Auth.login(req.body.email, req.body.password)
            .then(user => {
                req.session.userId = user.id;
                next();
            })
            .catch(error => {
                req.flash('error', error.message || error);
                res.redirect('back');
            });
    },

    logout: (req, res, next) => {
        req.session.userId = undefined;
        next();
    },

    authenticate: (req, res, next) => {
        const provider = strategies[req.body.provider];

        if (!provider) return next(new Error('Провайдер не найден'));

        if (req.body.returnUrl) req.session.returnUrl = req.body.returnUrl;

        provider.auth(req, res, next);
    },

    callback: (req, res, next) => req.provider.callback(req, res, next),

    connect: (req, res, next) => req.provider.auth(req, res, next),

    sendResetPasswordToken: (req, res) => {
        Auth.sendResetPasswordToken(req.body.email)
            .then(() => {
                req.flash('info', 'На указанный адрес было отправлено письмо для сброса пароля');
                res.redirect('back');
            })
            .catch(error => {
                req.flash('error', error.message || error);
                res.redirect('/');
            });
    },

    showResetPasswordForm: (req, res) => {
        if (!req.params.token) return res.redirect('/');

        res.render('auth/pages/reset', {
            id: 'reset',
            title: 'Сброс пароля',
            token: req.params.token
        });
    },

    resetPassword: (req, res) => {
        if (!req.body.password) {
            req.flash('error', 'Пароль не указан');
            return res.redirect('back');
        }

        req.session.userId = undefined;

        Auth.resetPassword(req.params.token, req.body.password)
            .then(() => {
                req.flash('success', 'Пароль изменен');
            })
            .catch(error => {
                req.flash('error', error.message || error);
            })
            .finally(() => res.redirect('/'));
    },

    redirect: (req, res) => {
        if (req.session.returnUrl) {
            const returnUrl = req.session.returnUrl;
            delete req.session.returnUrl;

            return res.redirect(returnUrl);
        }

        res.redirect('/');
    }
});