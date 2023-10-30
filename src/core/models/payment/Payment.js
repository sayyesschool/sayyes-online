const { Schema } = require('mongoose');
const moment = require('moment');

const { Status, StatusLabel, StatusIcon, Operator } = require('./constants');
const PaymentMethod = require('./PaymentMethod');

const Payment = new Schema({
    uuid: { type: String },
    amount: { type: Number, default: 0, min: 0, required: true },
    currency: { type: String, default: 'RUB' },
    status: { type: String, required: true, enum: Object.keys(Status) },
    operator: { type: String, enum: Object.keys(Operator) },
    description: { type: String, trim: true },
    confirmationUrl: { type: String },
    method: PaymentMethod,
    dueAt: { type: Date },
    expiresAt: { type: Date },
    paidAt: { type: Date },
    test: { type: Boolean },
    metadata: { type: Object }
}, {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true }
});

Payment.virtual('url').get(function() {
    return `/payments/${this.id}`;
});

Payment.virtual('dateLabel')
    .get(function() {
        return moment(this.createdAt).format('DD.MM.YYYY');
    });

Payment.virtual('statusLabel')
    .get(function() {
        return StatusLabel[this.status];
    });

Payment.virtual('statusIcon')
    .get(function() {
        return StatusIcon[this.status];
    });

Payment.virtual('isPending').get(function() {
    return this.status === 'pending';
});

Payment.virtual('isWaitingForCapture').get(function() {
    return this.status === 'waiting_for_capture';
});

Payment.virtual('isSucceeded').get(function() {
    return this.status === 'succeeded';
});

Payment.virtual('isCanceled').get(function() {
    return this.status === 'canceled';
});

Payment.virtual('isResolved').get(function() {
    return this.status === 'succeeded' || this.status === 'canceled';
});

Payment.virtual('isStuck').get(function() {
    return this.isPending && !this.confirmationUrl;
});

Payment.methods.getResolveUrl = function(paymentId) {
    return this.subscriptionId ?
        `/user/subscription/resolve?paymentId=${paymentId}` :
        `/user/payments/${paymentId}`;
};

module.exports = Payment;