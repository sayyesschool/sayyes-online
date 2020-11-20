const { Schema } = require('mongoose');
const moment = require('moment');

const PaymentMethod = require('./payment-method');

const STATUSES = {
    pending: { value: 'pending', label: 'В обработке', icon: 'hourglass_empty' },
    waiting_for_capture: { value: 'waiting_for_capture', label: 'В ожидании', icon: 'warning' },
    succeeded: { value: 'succeeded', label: 'Завершен', icon: 'done' },
    canceled: { value: 'canceled', label: 'Отменен', icon: 'clear' },
    refunded: { value: 'refunded', label: 'Возвращен', icon: 'clear' },
};

const OPERATORS = {
    yandex: { value: 'yandex', label: 'Яндекс.Касса', icon: 'hourglass_empty' }
};

const Payment = new Schema({
    paymentId: { type: String },
    amount: { type: Number, default: 0, min: 0, required: true },
    currency: { type: String, default: 'RUB' },
    status: { type: String, required: true, enum: Object.keys(STATUSES) },
    description: { type: String, trim: true },
    paid: { type: Boolean, default: false },
    confirmationUrl: { type: String },
    expiresAt: { type: Date },
    dueAt: { type: Date },
    paidAt: { type: Date },
    method: PaymentMethod,
    operator: { type: String, enum: Object.keys(OPERATORS) },
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    enrollment: { type: Schema.Types.ObjectId, ref: 'Enrollment' },
}, {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true }
});

Payment.statics.STATUSES = Array.from(Object.values(STATUSES));

Payment.virtual('url').get(function() {
    return `/payments/${this.id}`;
});

Payment.virtual('date')
    .get(function() {
        return moment(this.createdAt).format('DD.MM.YYYY');
    })
    .set(function(value) {
        this.createdAt = value;
    });

Payment.virtual('statusLabel')
    .get(function() {
        return STATUSES[this.status].label;
    });

Payment.virtual('statusIcon')
    .get(function() {
        return STATUSES[this.status].icon;
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