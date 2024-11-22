import expect from 'expect';

import { mock, toJSON } from '../../helpers';
import context from '../context';

import api, { user as USER } from './api';
import { EMAIL, NEW_PAYMENT, PACK_ID, PAID_PAYMENT } from './data';

const {
    models: { Meeting, Ticket, User },
    services: { Checkout, Mail }
} = context;

mock.method(Mail, 'send', async () => {});
mock.method(Mail, 'sendMany', async () => {});

describe('/payments', () => {
    after(async () => {
        await Meeting.deleteMany();
        await User.deleteMany();
        await Ticket.deleteMany();
    });

    describe('GET /', () => {
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

        it('should create a payment', async () => {
            const { body } = await api.post('/payments').send({
                email: EMAIL,
                packId: PACK_ID
            });

            expect(body.data).toMatch({
                metadata: {
                    email: EMAIL,
                    packId: PACK_ID
                }
            });
        });

        it('should return an error if the pack is not found', async () => {
            const { body } = await api.post('/payments').send({
                packId: undefined,
                email: EMAIL
            });

            expect(body.ok).toBe(false);
            expect(body.error).toBe('Пакет не найден');
        });

        it('should return an error if the email is not provided', async () => {
            const { body } = await api.post('/payments').send({
                packId: PACK_ID,
                email: undefined
            });

            expect(body.ok).toBe(false);
            expect(body.error).toBe('Не указан email');
        });

        it('should return an error if the user is not found', async () => {
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
            await Ticket.deleteMany();
        });

        it('should process a payment for a new user without a meeting registration', async () => {
            resolvePayment = mock.method(Checkout, 'resolvePayment', async () => PAID_PAYMENT);

            const { body } = await api.post('/payments/process').send({
                source: 'client',
                event: 'payment.succeeded',
                object: {
                    id: PAID_PAYMENT.id
                }
            });

            const user = await User.findOne({ email: EMAIL });
            const ticket = await Ticket.findOne({ userId: user.id });

            expect(body.ok).toBe(true);
            expect(body.data).toExist();
            expect(body.data).toMatch(toJSON(ticket));
            expect(user).toExist();
            expect(ticket).toExist();
        });

        it('should process a payment for an existing user with a meeting registration', async () => {
            const meeting = await Meeting.create({ title: 'Test Meeting' });

            resolvePayment = mock.method(Checkout, 'resolvePayment', async () => ({
                ...PAID_PAYMENT,
                metadata: {
                    ...PAID_PAYMENT.metadata,
                    userId: USER.id,
                    meetingId: meeting.id
                }
            }));

            const { body } = await api.post('/payments/process').send({
                source: 'client',
                event: 'payment.succeeded',
                object: {
                    id: PAID_PAYMENT.id
                }
            });

            const registration = body.data;
            const user = await User.findOne({ email: EMAIL });
            const ticket = await Ticket.findOne({ userId: user.id });

            expect(body.ok).toBe(true);
            expect(registration).toExist();
            expect(user).toExist();
            expect(ticket).toExist();
            expect(user).toMatch(registration.registrant);
            expect(ticket.meetingIds).toInclude(meeting.id);
            expect(registration.meetingId).toBe(meeting.id);
            expect(registration.ticketId).toBe(ticket.id);
            expect(registration.userId).toBe(user.id);
        });
    });
});