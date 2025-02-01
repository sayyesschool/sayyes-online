import expect from 'expect';

import { USER } from 'test/data/user';
import { spyOn } from 'test/helpers';
import context from 'test/func/context';

const {
    models: { User },
    services: { Auth, Mail }
} = context;

const mailSendSpy = spyOn(Mail, 'send');

describe('Auth Service', () => {
    afterEach(async () => {
        await User.deleteMany();
        mailSendSpy.reset();
    });

    describe('register', () => {
        it('registers a user', async () => {
            const user = await Auth.register(USER);

            expect(user).toExist();
        });

        it('throws an error if email is not provided', async () => {
            try {
                await Auth.register();
            } catch (error) {
                expect(error).toExist();
                expect(error.code).toBe(403);
            }
        });
    });

    describe('login', () => {
        it('logs in a user', async () => {
            await Auth.register({ ...USER, password: 'password' });

            const user = await Auth.login(USER.email, 'password');

            expect(user).toExist();
        });

        it('throws an error if user is not found', async () => {
            try {
                await Auth.login('', ''); // Invalid email
            } catch (error) {
                expect(error).toExist();
                expect(error.code).toBe(400);
            }
        });
    });

    describe('resetPassword', () => {
        it('resets a user password', async () => {
            const user = await Auth.register(USER);
            const newPassword = 'newpassword';

            const { resetPasswordToken } = await user.generateResetPasswordToken();

            await Auth.resetPassword(resetPasswordToken, newPassword);

            const updatedUser = await User.findById(user._id);

            expect(updatedUser.validatePassword(newPassword)).toBe(true);
        });

        it('throws an error if user is not found', async () => {
            try {
                await Auth.resetPassword('invalidtoken', 'newpassword');
            } catch (error) {
                expect(error).toExist();
                expect(error.code).toBe(404);
            }
        });

        it('throws an error if reset password token is invalid', async () => {
            const user = await Auth.register(USER);

            const userWithToken = await user.generateResetPasswordToken();

            userWithToken.resetPasswordTokenExpiresAt = new Date();

            try {
                await Auth.resetPassword(userWithToken.resetPasswordToken, 'newpassword');
            } catch (error) {
                expect(error).toExist();
                expect(error.code).toBe(400);
            }
        });
    });

    describe('sendResetPasswordToken', () => {
        it.only('sends a reset password token to a user', async () => {
            await Auth.register(USER);

            await Auth.sendResetPasswordToken(USER.email);

            const user = await User.findOne({ email: USER.email });

            expect(user.resetPasswordToken).toExist();
            expect(Mail.send).toHaveBeenCalled();
        });

        it('throws an error if user is not found', async () => {
            try {
                await Auth.sendResetPasswordToken('invalidemail');
            } catch (error) {
                expect(error).toExist();
                expect(error.code).toBe(404);
            }
        });
    });
});