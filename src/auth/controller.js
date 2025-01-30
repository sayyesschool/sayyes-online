import * as strategies from './strategies';

export default ({
    services: { Auth, Mail }
}) => ({
    user(req, res) {
        const user = req.user;

        res.json({
            ok: true,
            data: user?.toData()
        });
    },

    register(req, res, next) {
        const password = Auth.generatePassword();
        const data = {
            ...req.body,
            password
        };

        Auth.register(data)
            .then(user => {
                req.session.userId = user.id;

                Mail.send({
                    subject: 'Добро пожаловать в SAY YES Online!',
                    to: [{
                        email: user.email
                    }],
                    templateId: 1486677,
                    variables: {
                        firstname: user.firstname,
                        email: user.email,
                        password
                    }
                });

                next();
            })
            .catch(error => {
                req.flash('error', error.message || error);
                res.redirect('back');
            });
    },

    login(req, res, next) {
        Auth.login(req.body.email?.toLowerCase(), req.body.password)
            .then(user => {
                req.session.userId = user.id;
                next();
            })
            .catch(error => {
                req.flash('error', error.message || error);
                res.redirect('/' + (req.query.redirect ? `?redirect=${req.query.redirect}` : ''));
            });
    },

    logout(req, res, next) {
        req.session.userId = undefined;
        next();
    },

    authenticate(req, res, next) {
        const provider = strategies[req.body.provider];

        if (!provider) return next(new Error('Провайдер не найден'));

        if (req.body.returnUrl) req.session.returnUrl = req.body.returnUrl;

        provider.auth(req, res, next);
    },

    callback(req, res, next) {
        req.provider.callback(req, res, next);
    },

    connect(req, res, next) {
        req.provider.auth(req, res, next);
    },

    sendResetPasswordToken(req, res) {
        Auth.sendResetPasswordToken(req.body.email)
            .then(() => {
                req.flash('info', 'На указанный адрес было отправлено письмо для сброса пароля');
                res.redirect('/');
            })
            .catch(error => {
                req.flash('error', error.message || error);
                res.redirect('/');
            });
    },

    showResetPasswordForm(req, res) {
        if (!req.params.token) return res.redirect('/');

        res.render('reset', {
            id: 'reset',
            title: 'Сброс пароля',
            token: req.params.token
        });
    },

    resetPassword(req, res) {
        const password = req.body.password;
        const token = req.params.token;

        if (!password) {
            req.flash('error', 'Пароль не указан');

            return res.redirect('/');
        }

        req.session.userId = undefined;

        Auth.resetPassword(token, password)
            .then(() => {
                req.flash('success', 'Пароль изменен');
            })
            .catch(error => {
                req.flash('error', error.message || error);
            })
            .finally(() => res.redirect('/'));
    },

    redirect(req, res) {
        if (!req.session.redirect)
            return res.redirect('/');

        const redirect = req.session.redirect;

        delete req.session.redirect;

        return res.redirect(redirect);
    }
});