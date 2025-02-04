import { USER } from 'test/_data';
import { models } from 'test/_env';

const { User } = models;

export function withUser() {
    const state = {
        user: null
    };

    before(async () => {
        await User.deleteMany({});
        state.user = await User.create(USER);
    });

    after(async () => {
        state.user = null;
        await User.deleteMany({});
    });

    return state;
}