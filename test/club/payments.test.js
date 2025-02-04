import expect from 'expect';

import {
    MEETING,
    PACK_ID,
    PACKS,
    USER
} from 'test/_data';
import { context } from 'test/_env';

import api from './api';

const {
    clients: { checkout },
    models: { Data, Meeting, Membership, Payment, Registration, Request, User }
} = context;

describe('Club Payments API', function() {
    before(async () => {
        await Data.create({
            key: 'club.packs',
            value: PACKS
        });
    });

    afterEach(async () => {
        await Request.deleteMany();
        await Payment.deleteMany();
    });

    after(async () => {
        await Data.deleteMany();
        await User.deleteMany();
    });

    describe('Unauthenticated', () => {
        const DATA = {
            contact: {
                name: 'Jane',
                email: 'jane@sayyes.school'
            },
            packId: PACK_ID
        };

        describe('POST /create', () => {
            it('creates a payment', async () => {
                const { body: { data } } = await api.post('/payments/create').send(DATA);

                expect(data).toMatch({
                    metadata: {
                        email: DATA.contact.email,
                        name: DATA.contact.name,
                        membershipPackId: PACK_ID
                    }
                });
            });

            it('creates a request', async () => {
                const { body: { data } } = await api.post('/payments/create').send(DATA);

                const request = await Request.findOne({ _id: data.metadata.requestId });

                expect(request).toExist();
                expect(request.contact).toMatch(DATA.contact);
                expect(request.learnerId).toNotExist();
            });

            it('updates the test request', async () => {
                const testRequest = await Request.create({
                    type: Request.Type.Test,
                    contact: {
                        email: DATA.contact.email
                    }
                });

                const { body: { data } } = await api.post('/payments/create').send({
                    ...DATA,
                    requestId: testRequest.id
                });

                const updatedTestRequest = await Request.findById(testRequest.id);

                expect(updatedTestRequest.status).toBe(Request.Status.Completed);
                expect(updatedTestRequest.requestId).toEqual(data.metadata.requestId);
            });

            it('returns an error if the email is not provided', async () => {
                const { body } = await api.post('/payments/create').send({
                    ...DATA,
                    contact: {}
                });

                expect(body.ok).toBe(false);
                expect(body.error).toBe('Не указан email');
            });

            it('returns an error if the pack is not found', async () => {
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

            it('creates a user with a membership', async () => {
                const { body: { data: { uuid } } } = await api.post('/payments/create').send(DATA);

                await checkout.capturePayment(uuid);

                const { body: { data } } = await api.post('/payments/process').send({ uuid });

                const user = await User.findOne({ _id: data.userId });
                const membership = await Membership.findOne({ _id: data.membershipId });

                expect(user).toExist();
                expect(membership).toExist();
                expect(membership.userId).toEqual(user.id);
            });

            it('registers a user for a meeting if meeting ID is present', async () => {
                const meeting = await Meeting.create(MEETING);
                const { body: { data: { uuid } } } = await api.post('/payments/create').send({
                    ...DATA,
                    meetingId: meeting.id
                });

                await checkout.capturePayment(uuid);

                const { body: { data } } = await api.post('/payments/process').send({ uuid });

                const user = await User.findOne({ _id: data.userId });
                const membership = await Membership.findOne({ _id: data.membershipId });
                const registration = await Registration.findOne({ _id: data.registrationId });

                expect(user).toExist();
                expect(membership).toExist();
                expect(membership.userId).toEqual(user.id);
                expect(registration).toExist();
                expect(registration.userId).toEqual(user.id);
                expect(registration.membershipId).toEqual(membership.id);
                expect(membership.registrationIds).toInclude(registration.id);
            });

            it('updates the payment request', async () => {
                const { body: { data: { uuid } } } = await api.post('/payments/create').send(DATA);

                await checkout.capturePayment(uuid);

                const { body: { data } } = await api.post('/payments/process').send({ uuid });

                const request = await Request.findById(data.requestId);

                expect(request.learnerId).toEqual(data.userId);
                expect(request.status).toBe(Request.Status.Completed);
            });

            it('updates the test request if the request ID is present', async () => {
                const request = await Request.create({
                    type: Request.Type.Test,
                    contact: {
                        email: DATA.contact.email
                    }
                });

                const { body: { data: { uuid } } } = await api.post('/payments/create').send({
                    ...DATA,
                    requestId: request.id
                });

                await checkout.capturePayment(uuid);

                const { body: { data } } = await api.post('/payments/process').send({ uuid });

                const updatedRequest = await Request.findById(data.requestId);

                expect(updatedRequest.status).toBe(Request.Status.Completed);
                expect(updatedRequest.learnerId).toEqual(data.userId);
            });

            it('returns an error if the payment is not found', async () => {
                const { body } = await api.post('/payments/process').send({
                    uuid: '00000000-0000-0000-0000-000000000000'
                });

                expect(body.ok).toBe(false);
                expect(body.error).toBe('Платеж не найден');
            });

            it('returns an error if the payment is not paid', async () => {
                const { body: { data: { uuid } } } = await api.post('/payments/create').send(DATA);

                const { body } = await api.post('/payments/process').send({ uuid });

                expect(body.ok).toBe(false);
                expect(body.error).toBe('Платеж не оплачен');
            });
        });
    });

    describe('Authenticated', () => {
        const DATA = {
            userId: undefined,
            packId: PACK_ID
        };
        let user;

        before(async () => {
            user = await User.create(USER);
            DATA.userId = user.id;
        });

        describe('POST /create', () => {
            it('creates a payment', async () => {
                const { body: { data } } = await api.post('/payments/create').send(DATA);

                expect(data).toMatch({
                    metadata: {
                        userId: user.id,
                        membershipPackId: PACK_ID
                    }
                });
            });

            it('creates a request', async () => {
                const { body: { data } } = await api.post('/payments/create').send(DATA);

                const request = await Request.findOne({ _id: data.metadata.requestId });

                expect(request).toExist();
                expect(request.learnerId).toEqual(user.id);
                expect(request.toJSON().contact).toNotExist();
            });

            it('updates the test request', async () => {
                const testRequest = await Request.create({
                    type: Request.Type.Test,
                    contact: {
                        email: user.email
                    }
                });
                const { body: { data } } = await api.post('/payments/create').send({
                    ...DATA,
                    requestId: testRequest.id
                });

                const paymentRequest = await Request.findOne({ _id: data.metadata.requestId });
                const updatedTestRequest = await Request.findById(testRequest.id);

                expect(paymentRequest).toExist();
                expect(paymentRequest.learnerId).toEqual(user.id);
                expect(paymentRequest.toJSON().contact).toNotExist();
                expect(updatedTestRequest.status).toBe(Request.Status.Completed);
                expect(updatedTestRequest.learnerId).toEqual(user.id);
                expect(updatedTestRequest.requestId).toEqual(paymentRequest.id);
            });

            it('returns an error if the user is not found', async () => {
                const { body } = await api.post('/payments/create').send({
                    packId: PACK_ID,
                    userId: '000000000000000000000000'
                });

                expect(body.ok).toBe(false);
                expect(body.error).toBe('Пользователь не найден');
            });
        });

        describe('POST /process', () => {
            afterEach(async () => {
                await Membership.deleteMany();
                await User.deleteMany();
            });

            it('creates a membership for the user', async () => {
                const { body: { data: { uuid } } } = await api.post('/payments/create').send(DATA);

                await checkout.capturePayment(uuid);

                const { body: { data } } = await api.post('/payments/process').send({ uuid });

                const membership = await Membership.findOne({ _id: data.membershipId });

                expect(membership).toExist();
                expect(membership.userId).toEqual(user.id);
            });
        });
    });
});