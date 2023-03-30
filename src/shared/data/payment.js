const constants = require('../../core/models/payment/constants');

const paymentMethodOptions = Object.entries(constants.PaymentMethod).map(([key, value]) => ({
    key,
    value: key,
    content: value
}));

const operatorOptions = Object.entries(constants.Operator).map(([key, value]) => ({
    key,
    value: key,
    content: value
}));

module.exports = {
    paymentMethodOptions,
    operatorOptions,
    ...constants
};