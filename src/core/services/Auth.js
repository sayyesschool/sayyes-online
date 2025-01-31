import { randomBytes } from 'node:crypto';

function generatePassword(length = 12) {
    return randomBytes(length).toString('base64');
}

export default ({
    models: { User }
}, {
    onRegister,
    onResetPasswordTokenSent,
    onResetPassword
} = {}) => ({
    options: {
        //successRedirect: '/home',
        failureRedirect: '/',
        successFlash: true,
        failureFlash: true
    },

    generatePassword,

    async register({
        email,
        password = generatePassword(),
        firstname,
        lastname,
        role,
        domains
    } = {}) {
        if (!email) throw {
            code: 403,
            message: 'Для регистрации необходимо указать адрес электронной почты'
        };

        const user = await User.create({
            email,
            password,
            firstname,
            lastname,
            role,
            domains
        });

        onRegister?.(user, password);

        return user;
    },

    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user?.validatePassword(password)) {
            throw new Error('Неверный логин или пароль');
        } else {
            return user;
        }
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
    },

    async sendResetPasswordToken(email) {
        return User.findOne({ email })
            .then(user => {
                if (!user) throw new Error('Пользователь не найден');

                return user.generateResetPasswordToken();
            })
            .then(user => {
                onResetPasswordTokenSent?.(user);

                return user;
            });
    },

    async resetPassword(resetPasswordToken, password) {
        return User.findOne({ resetPasswordToken })
            .then(user => {
                if (!user) {
                    throw new Error('Пользователь не найден');
                } else if (!user.isResetPasswordTokenValid(resetPasswordToken)) {
                    throw new Error('Неверный токен для сброса пароля');
                } else {
                    return user.resetPassword(password);
                }
            })
            .then(user => {
                onResetPassword?.(user);

                return user;
            });
    }
});