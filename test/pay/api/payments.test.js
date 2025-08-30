import expect from 'expect';

import { createId } from 'test/helpers';
import { ENROLLMENT_ID, ENROLLMENT_PACK_5, ENROLLMENT_PACK_5_ID } from 'test/_data';
import { context, withEnrollment, withEnrollmentPacks, withModel, withUser } from 'test/_env';

import api from './api';

const {
    clients: { checkout },
    models: { Data, Membership, Payment, Registration, Request, User }
} = context;

describe('Pay API', function() {
    withEnrollmentPacks();
    withModel(Data);
    withModel(Payment, { cleanupAfterEach: true });
    withModel(Request, { cleanupAfterEach: true });
    withModel(Registration);

    describe('unauthenticated', () => {
        const DATA = {
            amount: 100,
            purpose: Payment.Purpose.Enrollment,
            contact: {
                name: 'Jane',
                email: 'jane@sayyes.school'
            },
            data: {
                enrollmentId: ENROLLMENT_ID,
                packId: ENROLLMENT_PACK_5_ID
            }
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
                    data: {}
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
        const enrollment = withEnrollment();

        const DATA = {
            amount: 100,
            purpose: Payment.Purpose.Enrollment,
            data: {
                enrollmentId: ENROLLMENT_ID,
                packId: ENROLLMENT_PACK_5_ID
            }
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
                const userId = createId();
                const { body } = await api.post('/payments/create').send({
                    ...DATA,
                    userId,
                    data: {
                        packId: ENROLLMENT_PACK_5_ID,
                        userId
                    }
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
                expect(data.enrollmentId).toEqual(enrollment.id);
                expect(data.lessonIds.length).toEqual(ENROLLMENT_PACK_5.numberOfLessons);
            });
        });
    });
});