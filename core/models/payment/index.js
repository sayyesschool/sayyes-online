const mongoose = require('mongoose');
const moment = require('moment');

const PaymentMethod = require('./payment-method');

const Schema = mongoose.Schema;

const STATUSES = {
    pending: { value: 'pending', title: 'В обработке', icon: 'hourglass_empty' },
    waiting_for_capture: { value: 'waiting_for_capture', title: 'В ожидании', icon: 'warning' },
    succeeded: { value: 'succeeded', title: 'Завершен', icon: 'done' },
    canceled: { value: 'canceled', title: 'Отменен', icon: 'clear' }
};

const Payment = new Schema({
    paymentId: { type: String, required: true },
    amount: { type: Number, default: 0, min: 0, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    currency: { type: String, default: 'RUB' },
    description: { type: String, trim: true },
    status: { type: String, required: true, enum: ['pending', 'waiting_for_capture', 'succeeded', 'canceled'] },
    paid: { type: Boolean, default: false },
    expiresAt: { type: Date },
    paidAt: { type: Date },
    confirmationUrl: { type: String },
    method: PaymentMethod
}, {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true }
});

Payment.statics.STATUSES = [
    STATUSES.pending,
    STATUSES.waiting_for_capture,
    STATUSES.succeeded,
    STATUSES.canceled
];

Payment.virtual('date')
    .get(function() {
        return moment(this.createdAt, 'DD.MM.YYYY');
    })
    .set(function(value) {
        this.createdAt = value;
    });

Payment.virtual('statusIcon')
    .get(function() {
        return STATUSES[this.status].icon;
    });

Payment.virtual('statusLabel')
    .get(function() {
        return STATUSES[this.status].title;
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
    return this.subscriptionId ? `/user/subscription/resolve?paymentId=${paymentId}` : `/user/payments/${paymentId}`;
};

module.exports = mongoose.model('Payment', Payment);;