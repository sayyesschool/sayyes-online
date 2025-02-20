import expect from 'expect';

import { createId, rejects } from 'test/helpers';
import { context, withUser } from 'test/_env';

const {
    clients: { checkout },
    models: { Payment, Request },
    services: { Checkout }
} = context;

const PAYMENT_DATA = {
    amount: 100,
    description: 'Test payment',
    purpose: Payment.Purpose.Enrollment,
    customer: {
        name: 'User',
        email: 'user@sayyes.school'
    }
};

describe('Checkout Service', () => {
    const user = withUser();

    afterEach(async () => {
        await Payment.deleteMany();
    });

    describe('createPayment', () => {
        it('creates payment without user', async () => {
            const payment = await Checkout.createPayment(PAYMENT_DATA);

            expect(payment.data).toMatch(PAYMENT_DATA.customer);
        });

        it('creates payment for user', async () => {
            const payment = await Checkout.createPayment({
                ...PAYMENT_DATA,
                userId: user.id
            });

            expect(payment.userId).toEqual(user._id);
        });

        it('updates request\'s status to `pending`', async () => {
            const request = await Request.create({});
            await Checkout.createPayment({
                ...PAYMENT_DATA,
                requestId: request.id
            });
            const updatedRequest = await Request.findById(request.id);

            expect(updatedRequest.status).toEqual(Request.Status.Pending);
        });

        it('throws if email or userId is not provided', async () => {
            await rejects(async () => await Checkout.createPayment({
                ...PAYMENT_DATA,
                customer: undefined
            }), {
                code: 400
            });
        });

        it('throws if amount is not provided', async () => {
            await rejects(async () => await Checkout.createPayment({}), {
                code: 400
            });
        });

        it('throws if purpose is not provided', async () => {
            await rejects(async () => await Checkout.createPayment({
                amount: 100
            }), {
                code: 400
            });
        });

        it('throws if user is not found', async () => {
            await rejects(async () => await Checkout.createPayment({
                ...PAYMENT_DATA,
                customer: undefined,
                userId: createId()
            }), {
                code: 404
            });
        });
    });

    describe('resolvePayment', () => {
        it('resolves payment', async () => {
            const payment = await Checkout.createPayment(PAYMENT_DATA);

            const resolvedPayment = await Checkout.resolvePayment(payment.uuid);

            expect(resolvedPayment).toExist();
        });

        it('throws error if payment is not found', async () => {
            await rejects(async () => await Checkout.resolvePayment('invalid'), {
                code: 404
            });
        });
    });

    describe('processPayment', () => {
        it('processes payment', async () => {
            const payment = await Checkout.createPayment(PAYMENT_DATA);
            await checkout.capturePayment(payment.uuid);

            const processedPayment = await Checkout.processPayment(payment.uuid);

            expect(processedPayment).toExist();
            expect(processedPayment.isProcessed).toBe(true);
            expect(processedPayment.userId).toExist();
        });

        it('updates request\'s status to `completed`', async () => {
            const request = await Request.create({});
            const payment = await Checkout.createPayment({
                ...PAYMENT_DATA,
                requestId: request.id
            });
            await checkout.capturePayment(payment.uuid);
            await Checkout.processPayment(payment.uuid);
            const updatedRequest = await Request.findById(request.id);

            expect(updatedRequest.status).toEqual(Request.Status.Completed);
        });

        it('does not process if payment is already processed', async () => {
            const payment = await Checkout.createPayment(PAYMENT_DATA);
            await checkout.capturePayment(payment.uuid);

            const firstPayment = await Checkout.processPayment(payment.uuid);
            const secondPayment = await Checkout.processPayment(payment.uuid);

            expect(firstPayment.processedAt).toEqual(secondPayment.processedAt);
        });

        it('throws if payment is not found', async () => {
            await rejects(async () => await Checkout.processPayment('invalid'), {
                code: 404
            });
        });

        it('throws if payment is not paid', async () => {
            const payment = await Checkout.createPayment(PAYMENT_DATA);

            await rejects(async () => await Checkout.processPayment(payment.uuid), {
                code: 400
            });
        });
    });

    describe('cancelPayment', () => {
        it('cancels payment', async () => {
            const payment = await Checkout.createPayment({
                ...PAYMENT_DATA,
                capture: false
            });
            await checkout.cancelPayment(payment.uuid);

            const canceledPayment = await Checkout.cancelPayment(payment.uuid);

            expect(canceledPayment).toExist();
            expect(canceledPayment.status).toBe('canceled');
        });
    });
});