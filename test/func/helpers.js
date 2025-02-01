import { USER } from 'test/data/user';
import { models } from 'test/func/context';

const { User } = models;

export function withUser() {
    let user = {};

    before(async () => {
        await User.deleteMany({});
        user = await User.create(USER);
    });

    after(async () => {
        await User.deleteMany({});
    });

    return new Proxy({}, {
        get: (_, prop) => user[prop]
    });
}