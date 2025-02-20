import expect from 'expect';

import { withUser } from 'test/_env/helpers';

import api from './api';

describe('LK Account API', () => {
    withUser();

    describe('PUT /profile', () => {
        it('updates profile', async () => {
            const data = {
                firstname: 'Jane',
                lastname: 'Dow'
            };

            const { body } = await api.put('/account/profile').send(data);

            expect(body.data).toMatch(data);
        });
    });

    describe('PUT /avatar', () => {
        it('updates avatar', async () => {
            const data = {
                image: {
                    src: 'avatar.jpg'
                }
            };

            const { body } = await api.put('/account/avatar').send(data);

            expect(body.data).toMatch(data);
        });
    });

    describe('PUT /password', () => {
        it('updates password', async () => {
            const { body } = await api.put('/account/password').send({
                currentPassword: 'password',
                newPassword: 'newpassword'
            });

            expect(body.ok).toBe(true);
        });
    });
});