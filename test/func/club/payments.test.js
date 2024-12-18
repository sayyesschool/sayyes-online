import expect from 'expect';

import { mock, toJSON } from '../../helpers';
import context from '../context';
import { DEFAULT_MEETING, DEFAULT_USER, NEW_PAYMENT, PACK_ID, PAID_PAYMENT, USER_EMAIL } from '../data';

import api from './api';

const {
    models: { Meeting, Membership, User },
    services: { Checkout, Mail }
} = context;

mock.method(Mail, 'send', async () => {});
mock.method(Mail, 'sendMany', async () => {});

describe('Club Payments API', () => {
    after(async () => {
        await Meeting.deleteMany();
        await Membership.deleteMany();
        await User.deleteMany();
    });

    describe('POST /', () => {
        let createPayment;
        let resolvePayment;

        before(() => {
            createPayment = mock.method(Checkout, 'createPayment', async () => NEW_PAYMENT);
            resolvePayment = mock.method(Checkout, 'resolvePayment', async () => PAID_PAYMENT);
        });

        after(() => {
            createPayment.mock.restore();
            resolvePayment.mock.restore();
        });

        it('creates a payment', async () => {
            const { body } = await api.post('/payments').send({
                email: USER_EMAIL,
                packId: PACK_ID
            });

            expect(body.data).toMatch({
                metadata: {
                    email: USER_EMAIL,
                    packId: PACK_ID
                }
            });
        });

        it('returns an error if the pack is not found', async () => {
            const { body } = await api.post('/payments').send({
                packId: undefined,
                email: USER_EMAIL
            });

            expect(body.ok).toBe(false);
            expect(body.error).toBe('Пакет не найден');
        });

        it('returns an error if the email is not provided', async () => {
            const { body } = await api.post('/payments').send({
                packId: PACK_ID,
                email: undefined
            });

            expect(body.ok).toBe(false);
            expect(body.error).toBe('Не указан email');
        });

        it('returns an error if the user is not found', async () => {
            const { body } = await api.post('/payments').send({
                packId: PACK_ID,
                userId: '000000000000000000000000'
            });

            expect(body.ok).toBe(false);
            expect(body.error).toBe('Пользователь не найден');
        });
    });

    describe('POST /process', () => {
        let resolvePayment;

        afterEach(async () => {
            resolvePayment.mock.restore();
            await Membership.deleteMany();
            await User.deleteMany();
        });

        it('processes a payment for a new user without a meeting registration', async () => {
            resolvePayment = mock.method(Checkout, 'resolvePayment', async () => PAID_PAYMENT);

            const { body } = await api.post('/payments/process').send({
                source: 'client',
                event: 'payment.succeeded',
                object: {
                    id: PAID_PAYMENT.id
                }
            });

            const user = await User.findOne({ email: USER_EMAIL });
            const membership = await Membership.findOne({ userId: user.id });

            expect(user).toExist();
            expect(membership).toExist();
            expect(body.data).toMatch(toJSON(membership));
        });

        it('processes a payment for an existing user with a meeting registration', async () => {
            const user = await User.create(DEFAULT_USER);
            const meeting = await Meeting.create(DEFAULT_MEETING);

            resolvePayment = mock.method(Checkout, 'resolvePayment', async () => ({
                ...PAID_PAYMENT,
                metadata: {
                    ...PAID_PAYMENT.metadata,
                    userId: user.id,
                    meetingId: meeting.id
                }
            }));

            const { body: { data } } = await api.post('/payments/process').send({
                source: 'client',
                event: 'payment.succeeded',
                object: {
                    id: PAID_PAYMENT.id
                }
            });

            const membership = await Membership.findOne({ userId: user.id });

            expect(data).toExist();
            expect(user).toExist();
            expect(membership).toExist();
            expect(membership.registrationIds).toInclude(data.id);
            expect(data.userId).toEqual(user.id);
            expect(data.meetingId).toBe(meeting.id);
            expect(data.membershipId).toBe(membership.id);
            expect(data.userId).toBe(user.id);
        });
    });
});