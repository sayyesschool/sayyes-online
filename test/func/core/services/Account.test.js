import expect from 'expect';

import { USER } from 'test/data/user';
import context from 'test/func/context';

const {
    models: { User },
    services: { Account }
} = context;

describe('Account Service', () => {
    afterEach(async () => {
        await User.deleteMany();
    });

    describe('increaseBalance', () => {
        it('increases user balance', async () => {
            const user = await User.create(USER);

            const updatedUser = await Account.increaseBalance(user, 100);

            expect(updatedUser).toExist();
            expect(updatedUser.balance).toBe(100);
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
        it('decreases user balance', async () => {
            const user = await User.create(USER);

            const updatedUser = await Account.decreaseBalance(user, 50);

            expect(updatedUser).toExist();
            expect(updatedUser.balance).toBe(50);
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