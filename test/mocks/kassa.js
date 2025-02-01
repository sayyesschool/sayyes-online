import { PAYMENT_CANCELED, PAYMENT_PENDING, PAYMENT_SUCCEEDED } from 'test/data/kassa';
import { mock } from 'test/helpers';

export default {
    getPayment: mock.fn(async () => PAYMENT_SUCCEEDED),

    createPayment: mock.fn(async data => ({
        ...PAYMENT_PENDING,
        amount: data.amount,
        description: data.description,
        metadata: data.metadata
    })),

    cancelPayment: mock.fn(async () => PAYMENT_CANCELED)
};