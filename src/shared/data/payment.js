import {
    PaymentMethodLabel,
    PaymentOperatorLabel,
    PaymentPurposeLabel,
    PaymentStatusLabel
} from 'core/models/payment/constants';

export * from 'core/models/payment/constants';

export const paymentMethodOptions = getOptions(PaymentMethodLabel);
export const paymentPurposeOptions = getOptions(PaymentPurposeLabel);
export const paymentOperatorOptions = getOptions(PaymentOperatorLabel);
export const paymentStatusOptions = getOptions(PaymentStatusLabel);

function getOptions(labels) {
    return [
        {
            key: 'all',
            value: '',
            content: 'Все'
        },
        ...Object.entries(labels).map(([key, value]) => ({
            key,
            value: key,
            content: value
        }))
    ];
}