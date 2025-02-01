import { isValidObjectId } from 'mongoose';

export default ({
    models: { User },
    services: { Mail }
}) => ({
    async increaseBalance(user, amount, { notify = false } = {}) {
        const userId = isValidObjectId(user) ? user : user.id;

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $inc: { balance: amount }
        }, { new: true });

        if (!updatedUser) throw {
            code: 404,
            message: 'Пользователь не найден'
        };

        if (notify) {
            Mail.send({
                to: [{
                    name: user.fullname,
                    email: user.email
                }],
                subject: 'Успешное пополнение баланса',
                templateId: 1348783,
                variables: {
                    firstname: user.firstname
                }
            });
        }

        return updatedUser;
    },

    async decreaseBalance(user, amount) {
        const userId = user.id || user;

        return User.findByIdAndUpdate(userId, {
            $inc: { balance: -amount }
        }, { new: true });
    }
});