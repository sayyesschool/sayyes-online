import expect from 'expect';

import { USER } from 'test/_data';
import { context } from 'test/_env';

const {
    models: { User },
    services: { Account }
} = context;

describe('Account Service', () => {
    afterEach(async () => {
        await User.deleteMany();
    });

    describe('increaseBalance', () => {
        it.skip('increases user balance', async () => {
            const user = await User.create(USER);

            const updatedUser = await Account.increaseBalance(user, 100);

            expect(updatedUser).toExist();
        });

        it('throws an error if user is not found', async () => {
            try {
                await Account.increaseBalance('invalid', 100);
            } catch (error) {
                expect(error).toExist();
            }
        });
    });

    describe('decreaseBalance', () => {
        it.skip('decreases user balance', async () => {
            const user = await User.create(USER);

            const updatedUser = await Account.decreaseBalance(user, 50);

            expect(updatedUser).toExist();
        });

        it('throws an error if user is not found', async () => {
            try {
                await Account.decreaseBalance('invalid', 100);
            } catch (error) {
                expect(error).toExist();
            }
        });
    });
});