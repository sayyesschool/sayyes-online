import { PaymentMethod, PaymentOperator } from 'core/models/payment/constants';

export * from 'core/models/payment/constants';

export const paymentMethodOptions = Object.entries(PaymentMethod).map(([key, value]) => ({
    key,
    value: key,
    content: value
}));

export const operatorOptions = Object.entries(PaymentOperator).map(([key, value]) => ({
    key,
    value: key,
    content: value
}));