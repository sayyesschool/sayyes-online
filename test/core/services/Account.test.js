import expect from 'expect';

import { context } from 'test/_env';

const {
    models: { User }
} = context;

describe.skip('Account Service', () => {
    afterEach(async () => {
        await User.deleteMany();
    });
});