const crypto = require('crypto');

module.exports = ({ User }, { onRegister, onResetPasswordTokenSent }) => ({
    options: {
        //successRedirect: '/home',
        failureRedirect: '/',
        successFlash: true,
        failureFlash: true
    },

    async register({ password = crypto.randomBytes(12).toString('base64'), ...data }) {
        const user = await User.create({ password, ...data });

        onRegister(user, password);

        return user;
    },

    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user || !user.validatePassword(password)) {
            throw new Error('Неверный логин или пароль');
        } else {
            return user;
        }
    },

    authorize: (account, done) => {
        User.findOne({ 'accounts.userId': account.userId })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Пользователь не найден' });
                } else {
                    done(null, user);
                }
            })
            .catch(error => {
                logError(error);
                done(error, null, { message: error.message });
            });
    },

    connect: (currentUser, account, done) => {
        User.findOne({ 'accounts.userId': account.userId })
            .then(user => {
                if (user && (user.id === currentUser.id)) throw new Error('Данный аккаунт уже привязан');
                if (user) throw new Error('Данный аккаунт уже привязан к другой учетной записи');

                currentUser.accounts.push(account);

                return currentUser.save();
            })
            .then(() => done(null, currentUser, { message: `${account.title} подключен` }))
            .catch(error => {
                logError(error);
                done(error, null, { message: error.message });
            });
    },

    disconnect: (user, providerId) => {
        const account = user.accounts.id(providerId);

        if (!account) {
            const error = new Error('Аккаунт не найден');
            error.status = 404;
            throw error;
        }

        account.remove();

        return user.save().then(() => account);
    },

    sendResetPasswordToken(email) {
        return User.findOne({ email })
            .then(user => {
                if (!user) throw new Error('Пользователь не найден');

                onResetPasswordTokenSent(user);

                return user.generateResetPasswordToken();
            });
    },

    resetPassword(resetPasswordToken, password) {
        return User.findOne({ resetPasswordToken })
            .then(user => {
                if (!user) {
                    throw new Error('Пользователь не найден');
                } else if (!user.isResetPasswordTokenValid(resetPasswordToken)) {
                    throw new Error('Неверный токен для сброса пароля');
                } else {
                    user.resetPasswordToken = undefined;
                    user.resetPasswordTokenExpiresAt = undefined;
                    user.password = password;

                    return user.save();
                }
            });
    }
});