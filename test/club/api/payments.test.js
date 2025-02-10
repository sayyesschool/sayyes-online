import expect from 'expect';

import { PACK_4_ID } from 'test/_data';
import { context, withMembershipPacks, withUser } from 'test/_env';

import api from './api';

const {
    clients: { checkout },
    models: { Data, Membership, Payment, Registration, Request, User }
} = context;

describe('Club Payments API', function() {
    withMembershipPacks();

    afterEach(async () => {
        await Request.deleteMany();
        await Payment.deleteMany();
    });

    after(async () => {
        await Data.deleteMany();
        await Registration.deleteMany();
        await User.deleteMany();
    });

    describe('unauthenticated', () => {
        const DATA = {
            contact: {
                name: 'Jane',
                email: 'jane@sayyes.school'
            },
            packId: PACK_4_ID
        };

        describe('POST /create', () => {
            it('returns payment', async () => {
                const { body } = await api.post('/payments/create').send(DATA);

                expect(body.data).toExist();
            });

            it('returns error if email is not provided', async () => {
                const { body } = await api.post('/payments/create').send({
                    ...DATA,
                    contact: {}
                });

                expect(body.ok).toBe(false);
                expect(body.error).toBe('Не указан email');
            });

            it('returns error if pack is not found', async () => {
                const { body } = await api.post('/payments/create').send({
                    ...DATA,
                    packId: undefined
                });

                expect(body.ok).toBe(false);
                expect(body.error).toBe('Пакет не найден');
            });
        });

        describe('POST /process', () => {
            afterEach(async () => {
                await Membership.deleteMany();
                await User.deleteMany();
            });

            it('returns result', async () => {
                const { body: { data: { uuid } } } = await api.post('/payments/create').send(DATA);

                await checkout.capturePayment(uuid);

                const { body } = await api.post('/payments/process').send({ uuid });

                expect(body.data).toExist();
            });

            it('returns error if payment is not found', async () => {
                const { body } = await api.post('/payments/process').send({
                    uuid: '00000000-0000-0000-0000-000000000000'
                });

                expect(body.error).toBe('Платеж не найден');
            });

            it('returns error if payment is not paid', async () => {
                const { body: { data: { uuid } } } = await api.post('/payments/create').send(DATA);

                const { body } = await api.post('/payments/process').send({ uuid });

                expect(body.error).toBe('Платеж не оплачен');
            });
        });
    });

    describe('authenticated', () => {
        const user = withUser();

        const DATA = {
            userId: undefined,
            packId: PACK_4_ID
        };

        before(async () => {
            DATA.userId = user.id;
        });

        describe('POST /create', () => {
            it('returns payment', async () => {
                const { body } = await api.post('/payments/create').send(DATA);

                expect(body.data).toExist();
            });

            it('returns error if user is not found', async () => {
                const { body } = await api.post('/payments/create').send({
                    packId: PACK_4_ID,
                    userId: '000000000000000000000000'
                });

                expect(body.error).toBe('Пользователь не найден');
            });
        });

        describe('POST /process', () => {
            afterEach(async () => {
                await Membership.deleteMany();
            });

            it('returns result', async () => {
                const { body: { data: { uuid } } } = await api.post('/payments/create').send(DATA);

                await checkout.capturePayment(uuid);

                const { body: { data } } = await api.post('/payments/process').send({ uuid });

                expect(data).toExist();
            });
        });
    });
});