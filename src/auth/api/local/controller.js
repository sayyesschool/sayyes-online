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

    async register(req, res) {
        const password = Auth.generatePassword();

        Auth.register({
            ...req.body,
            password
        }).then(user => {
            req.session.userId = user.id;

            return Mail.send({
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
        }).then(() => {
            req.flash('info', 'На указанный адрес было отправлено письмо с паролем');
            res.redirect(req.query.redirect || '/login');
        }).catch(error => {
            req.flash('error', error.message || error);
            res.redirect('/register');
        });
    },

    loginPage(req, res, next) {
        if (req.user) return next();

        res.render('login', {
            title: 'Вход',
            redirect: req.query?.redirect
        });
    },

    login(req, res) {
        Auth.login(req.body.email?.toLowerCase(), req.body.password)
            .then(user => {
                req.session.userId = user.id;
                res.redirect(req.query.redirect || '/');
            })
            .catch(error => {
                req.flash('error', error.message || error);
                res.redirect('/login');
            });
    },

    logout(req, res) {
        req.session.userId = undefined;
        res.redirect('/login');
    },

    resetPasswordToken(req, res) {
        Auth.sendResetPasswordToken(req.body.email)
            .then(() => {
                req.flash('info', 'На указанный адрес было отправлено письмо для сброса пароля');
                res.redirect('/login');
            })
            .catch(error => {
                req.flash('error', error.message || error);
                res.redirect('/login');
            });
    },

    resetPasswordPage(req, res) {
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

            return res.redirect(req.originalUrl);
        }

        req.session.userId = undefined;

        Auth.resetPassword(token, password)
            .then(() => {
                req.flash('success', 'Пароль изменен');
                res.redirect('/login');
            })
            .catch(error => {
                req.flash('error', error.message || error);
                res.redirect(req.originalUrl);
            });
    }
});