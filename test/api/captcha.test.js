import expect from 'expect';

import { context } from 'test/_env';

import server from './server';

const {
    clients: { captcha }
} = context;

describe('Captcha API', () => {
    describe('POST /', () => {
        it('verifies token', async function() {
            const token = '123456';
            const { body } = await server.post('/captcha').send({ token });

            expect(body).toMatch({ success: true });
            expect(captcha.verify).toHaveBeenCalledWith(token);
        });
    });
});