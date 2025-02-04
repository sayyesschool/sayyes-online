import expect from 'expect';

import { USER } from 'test/_data';
import { context } from 'test/_env';

import api from './api';

const {
    clients: { mail },
    models: { User },
    services: { Auth }
} = context;

describe('Auth Local API', () => {
    afterEach(async () => {
        await User.deleteMany();
    });

    describe('POST /register', () => {
        it('registers a user', async () => {
            await api.post('/register')
                .send(USER)
                .expect(302)
                .expect('Location', '/login');

            const user = await User.findOne({ email: USER.email });

            expect(user).toExist();
            expect(mail.send).toHaveBeenCalled();
        });

        it('handles errors', async () => {
            await api.post('/register')
                .send({})
                .expect(302)
                .expect('Location', '/register');
        });
    });

    describe('GET /login', () => {
        it('returns login page', async () => {
            await api.get('/login')
                .expect('Content-Type', /html/)
                .expect(200);
        });
    });

    describe('POST /login', () => {
        it('logs in user', async () => {
            const password = Auth.generatePassword();
            await Auth.register({
                ...USER,
                password
            });

            await api.post('/login')
                .send({ email: USER.email, password })
                .expect(302)
                .expect('Location', '/');
        });

        it('redirects if redirect query is present', async () => {
            const password = Auth.generatePassword();
            await Auth.register({
                ...USER,
                password
            });

            await api.post('/login?redirect=/user')
                .send({ email: USER.email, password })
                .expect(302)
                .expect('Location', '/user');
        });

        it('handles errors', async () => {
            await api.post('/login')
                .send({ email: USER.email, password: USER.password })
                .expect(302)
                .expect('Location', '/login');
        });
    });

    describe('GET /logout', () => {
        it('logs out user', async () => {
            await api.get('/logout')
                .expect(302)
                .expect('Location', '/login');
        });
    });

    describe('POST /reset', () => {
        it('sends a reset password token', async () => {
            const password = Auth.generatePassword();
            await Auth.register({
                ...USER,
                password
            });

            await api.post('/reset')
                .send({ email: USER.email })
                .expect(302)
                .expect('Location', '/login');

            const user = await User.findOne({ email: USER.email });

            expect(user.resetPasswordToken).toExist();
            expect(mail.send).toHaveBeenCalled();
        });

        it('handles errors', async () => {
            await api.post('/reset')
                .send({ email: USER.email })
                .expect(302)
                .expect('Location', '/login');
        });
    });

    describe('GET /reset/:token', () => {
        it('returns reset password page', async () => {
            const password = Auth.generatePassword();
            await Auth.register({
                ...USER,
                password
            });

            const user = await User.findOne({ email: USER.email });

            await api.get(`/reset/${user.resetPasswordToken}`)
                .expect('Content-Type', /html/)
                .expect(200);
        });
    });

    describe('POST /reset/:token', () => {
        it('resets password', async () => {
            const oldPassword = Auth.generatePassword();
            const newPassword = Auth.generatePassword();
            await Auth.register({
                ...USER,
                password: oldPassword
            });

            await api.post('/reset')
                .send({ email: USER.email });

            const { resetPasswordToken } = await User.findOne({ email: USER.email });

            await api.post(`/reset/${resetPasswordToken}`)
                .send({ password: newPassword })
                .expect(302)
                .expect('Location', '/login');

            const user = await User.findOne({ email: USER.email });

            expect(user.resetPasswordToken).toNotExist();
            expect(user.validatePassword(newPassword)).toBe(true);
        });

        it('handles errors', async () => {
            await api.post('/reset/invalidtoken')
                .send({ password: 'newpassword' })
                .expect(302)
                .expect('Location', '/reset/invalidtoken');
        });
    });
});