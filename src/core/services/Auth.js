import { randomBytes } from 'node:crypto';

export default ({
    config,
    models: { User },
    services: { Mail }
}) => ({
    options: {
        //successRedirect: '/home',
        failureRedirect: '/',
        successFlash: true,
        failureFlash: true
    },

    generatePassword(length = 12) {
        return randomBytes(length).toString('base64');
    },

    async getUser($user) {
        const user = await User.resolve($user);

        if (!user) throw {
            code: 404,
            message: 'Пользователь не найден'
        };

        return user;
    },

    async register({
        email,
        password = this.generatePassword(),
        name,
        firstname,
        lastname,
        role,
        domains
    } = {},
    options = {
        notify: false
    }) {
        if (!email) throw {
            code: 403,
            message: 'Для регистрации необходимо указать адрес электронной почты'
        };

        [firstname, lastname] = name ? name.split(' ') : [firstname, lastname];

        const user = await User.create({
            email,
            password,
            firstname,
            lastname,
            role,
            domains
        });

        if (options.notify) {
            await Mail.send({
                subject: 'Добро пожаловать в SAY YES!',
                to: {
                    name: user.fullname,
                    email: user.email
                },
                templateId: 6729874,
                variables: {
                    name: user.firstname,
                    email: user.email,
                    password,
                    loginUrl: `//auth.${config.APP_DOMAIN}/login`,
                    supportEmail: `support@${config.APP_DOMAIN}`
                }
            });
        }

        return user;
    },

    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user?.validatePassword(password)) throw {
            code: 400,
            message: 'Неверный логин или пароль'
        };

        return user;
    },

    async resetPassword(resetPasswordToken, password) {
        const user = await User.findOne({ resetPasswordToken });

        if (!user) {
            throw {
                code: 404,
                message: 'Пользователь не найден'
            };
        } else if (!user.isResetPasswordTokenValid(resetPasswordToken)) {
            throw {
                code: 400,
                message: 'Срок действия токена истек'
            };
        }

        return user.resetPassword(password);
    },

    async sendResetPasswordToken(email) {
        const user = await User.findOne({ email });

        if (!user) throw {
            code: 404,
            message: 'Пользователь не найден'
        };

        await user.generateResetPasswordToken();

        await Mail.send({
            subject: 'Изменение пароля для входа на сайт',
            to: {
                email: user.email,
                name: user.fullname
            },
            templateId: 5329582,
            variables: {
                firstname: user.firstname,
                resetUrl: `//auth.${config.APP_DOMAIN}/reset/${user.resetPasswordToken}`
            }
        });
    },

    async authorize(account, done) {
        User.findOne({ 'accounts.userId': account.userId })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Пользователь не найден' });
                } else {
                    done(null, user);
                }
            })
            .catch(error => {
                done(error, null, { message: error.message });
            });
    },

    async connect(currentUser, account, done) {
        User.findOne({ 'accounts.userId': account.userId })
            .then(user => {
                if (user && (user.id === currentUser.id))
                    throw new Error('Данный аккаунт уже привязан');

                if (user)
                    throw new Error('Данный аккаунт уже привязан к другой учетной записи');

                return user.addAccount(account);
            })
            .then(() => {
                done(null, currentUser, { message: `${account.title} подключен` });
            })
            .catch(error => {
                done(error, null, { message: error.message });
            });
    },

    async disconnect(user, accountId) {
        return user.removeAccount(accountId);
    }
});