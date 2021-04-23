const constants = require('../../core/models/payment/constants');

const paymentMethodOptions = Object.entries(constants.PaymentMethod).map(([key, value]) => ({
    key,
    value: key,
    text: value
}));

const operatorOptions = Object.entries(constants.Operator).map(([key, value]) => ({
    key,
    value: key,
    text: value
}));

module.exports = {
    paymentMethodOptions,
    operatorOptions,
    ...constants
};