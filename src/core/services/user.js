const { isValidObjectId } = require('mongoose');

module.exports = ({
    models: { User, Participant },
    services: { Mail }
}) => ({
    roles: User.roles,

    get(...args) {
        return User.find(...args);
    },

    getOne(query, ...args) {
        return isValidObjectId(query) ?
            User.findById(query, ...args) :
            User.findOne(query, ...args);
    },

    async resolve(arg) {
        if (typeof arg?.id === 'string') return arg;

        const user = await this.getOne(arg);

        if (!user) throw new Error('Пользователь не найден');

        return user;
    },

    create(...args) {
        return User.create(...args);
    },

    update(query, data, options) {
        return isValidObjectId(query) ?
            User.findByIdAndUpdate(query, data, { new: true, ...options }) :
            User.findOneAndUpdate(query, data, { new: true, ...options });
    },

    delete(query, ...args) {
        return isValidObjectId(query) ?
            User.findByIdAndDelete(query, ...args) :
            User.findOneAndDelete(query, ...args);
    },

    async increaseBalance(user, amount, notify) {
        const userId = isValidObjectId(user) ? user : user.id;

        const updatedUser = await Participant.findByIdAndUpdate(userId, {
            $inc: { balance: amount }
        }, { new: true });

        if (updatedUser && notify) {
            Mail.send({
                to: [{
                    name: updatedUser.fullname,
                    email: updatedUser.email
                }],
                subject: 'Успешное пополнение баланса',
                templateId: 1348783,
                variables: {
                    firstname: updatedUser.firstname
                }
            });
        }

        return updatedUser;
    },

    async decreaseBalance(user, amount) {
        const userId = user.id || user;

        return Participant.findByIdAndUpdate(userId, {
            $inc: { balance: -amount }
        }, { new: true });
    }
});