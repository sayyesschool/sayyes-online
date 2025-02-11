import expect from 'expect';

import { USER_EMAIL, USER_ID } from 'test/_data';
import { context } from 'test/_env';

const {
    clients: { checkout },
    models: { User },
    services: { Checkout }
} = context;

describe('Checkout Service', () => {
    afterEach(async () => {
        await User.deleteMany();
    });

    describe('createPayment', () => {
        it('creates a payment', async () => {
            const payment = await Checkout.createPayment({
                amount: 100,
                description: 'Test payment',
                email: USER_EMAIL,
                metadata: { userId: USER_ID }
            });

            expect(payment).toExist();
        });

        it('throws an error if amount is not provided', async () => {
            try {
                await Checkout.createPayment();
            } catch (error) {
                expect(error).toExist();
                expect(error.code).toBe(400);
            }
        });
    });

    describe('resolvePayment', () => {
        it('resolves a payment', async () => {
            const payment = await Checkout.createPayment({
                amount: 100,
                description: 'Test payment',
                email: USER_EMAIL,
                metadata: { userId: USER_ID }
            });

            const resolvedPayment = await Checkout.resolvePayment(payment.uuid);

            expect(resolvedPayment).toExist();
        });

        it('throws an error if payment is not found', async () => {
            try {
                await Checkout.resolvePayment('invalid');
            } catch (error) {
                expect(error).toExist();
            }
        });
    });

    describe('cancelPayment', () => {
        it('cancels a payment', async () => {
            const payment = await Checkout.createPayment({
                amount: 100,
                description: 'Test payment',
                email: USER_EMAIL,
                capture: false,
                metadata: { userId: USER_ID }
            });
            await checkout.cancelPayment(payment.uuid);

            const canceledPayment = await Checkout.cancelPayment(payment.uuid);

            expect(canceledPayment).toExist();
            expect(canceledPayment.status).toBe('canceled');
        });
    });
});