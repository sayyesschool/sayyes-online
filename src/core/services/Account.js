import { isValidObjectId } from 'mongoose';

export default ({
    models: { User },
    events: {
        onIncreaseBalance
    }
}) => ({
    async increaseBalance(user, amount, notify) {
        const userId = isValidObjectId(user) ? user : user.id;

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $inc: { balance: amount }
        }, { new: true });

        if (updatedUser && notify) {
            onIncreaseBalance?.(updatedUser, amount);
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