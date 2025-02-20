import { randomUUID } from 'node:crypto';

import { mock } from 'test/helpers';
import { PAYMENT_CANCELED, PAYMENT_PENDING, PAYMENTS } from 'test/_data/checkout';

const cache = {};

export default {
    getPayment: mock.fn(async id => {
        return cache[id] || PAYMENTS.find(payment => payment.id === id);
    }),

    createPayment: mock.fn(async data => {
        const payment = {
            ...PAYMENT_PENDING,
            id: randomUUID(),
            ...data,
            amount: {
                value: Number(data.amount).toFixed(2),
                currency: 'RUB'
            }
        };

        cache[payment.id] = payment;

        return payment;
    }),

    capturePayment: mock.fn(async id => {
        const payment = cache[id];

        if (!payment) throw {
            code: 404,
            message: 'Платеж не найден'
        };

        payment.status = 'succeeded';
        payment.isSucceeded = true;
        payment.paid = true;
        payment.isPaid = true;
        payment.captured_at = new Date().toISOString();

        return payment;
    }),

    cancelPayment: mock.fn(async id => {
        const payment = cache[id];

        if (!payment) throw {
            code: 404,
            message: 'Платеж не найден'
        };

        payment.status = 'canceled';
        payment.isCanceled = true;

        return payment;
    })
};