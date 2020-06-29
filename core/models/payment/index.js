const mongoose = require('mongoose');
const moment = require('moment');

const PaymentMethod = require('./payment-method');

const Schema = mongoose.Schema;

const STATUSES = {
    pending: { value: 'pending', label: 'В обработке', icon: 'hourglass_empty' },
    waiting_for_capture: { value: 'waiting_for_capture', label: 'В ожидании', icon: 'warning' },
    succeeded: { value: 'succeeded', label: 'Завершен', icon: 'done' },
    canceled: { value: 'canceled', label: 'Отменен', icon: 'clear' },
    refunded: { value: 'refunded', label: 'Возвращен', icon: 'clear' },
};

const Payment = new Schema({
    paymentId: { type: String, required: true },
    amount: { type: Number, default: 0, min: 0, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    currency: { type: String, default: 'RUB' },
    description: { type: String, trim: true },
    status: { type: String, required: true, enum: Object.keys(STATUSES) },
    paid: { type: Boolean, default: false },
    expiresAt: { type: Date },
    dueAt: { type: Date },
    paidAt: { type: Date },
    confirmationUrl: { type: String },
    method: PaymentMethod,
    note: { type: String }
}, {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true }
});

Payment.statics.STATUSES = Array.from(Object.values(STATUSES));

Payment.virtual('date')
    .get(function() {
        return moment(this.createdAt, 'DD.MM.YYYY');
    })
    .set(function(value) {
        this.createdAt = value;
    });

Payment.virtual('statusLabel')
    .get(function() {
        return STATUSES[this.status].title;
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
    return this.subscriptionId ? `/user/subscription/resolve?paymentId=${paymentId}` : `/user/payments/${paymentId}`;
};

module.exports = mongoose.model('Payment', Payment);