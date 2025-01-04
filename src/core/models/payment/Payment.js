import moment from 'moment';
import { Schema } from 'mongoose';

import { PaymentOperator, PaymentStatus, PaymentStatusIcon, PaymentStatusLabel } from './constants';
import PaymentMethod from './PaymentMethod';

export const Payment = new Schema({
    uuid: { type: String },
    amount: { type: Number, default: 0, min: 0, required: true },
    currency: { type: String, default: 'RUB' },
    description: { type: String, trim: true },
    status: { type: String, required: true, enum: Object.keys(PaymentStatus) },
    operator: { type: String, enum: Object.keys(PaymentOperator) },
    method: PaymentMethod,
    paid: { type: Boolean, default: false },
    refundable: { type: Boolean, default: false },
    refunded: { type: Boolean, default: false },
    test: { type: Boolean },
    confirmation: {
        type: {
            type: String,
            enum: ['embedded', 'redirect']
        },
        confirmationToken: { type: String },
        confirmationUrl: { type: String },
        returnUrl: { type: String }
    },
    cancelation: {
        party: { type: String },
        reason: { type: String }
    },
    metadata: { type: Object },
    expiresAt: { type: Date },
    paidAt: { type: Date },
    userId: { type: Schema.Types.ObjectId }
}, {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true }
});

Payment.statics.getByMonth = async function() {
    const today = new Date();

    return this.aggregate()
        .match({
            date: {
                $gt: new Date(today.getFullYear() - 1, 11, 31),
                $lt: new Date(today.getFullYear() + 1, 0)
            }
        })
        .group({
            _id: { $month: '$paidAt' },
            count: { $sum: 1 },
            amount: { $sum: '$price' }
        });
};

Payment.virtual('url').get(function() {
    return `/payments/${this.id}`;
});

Payment.virtual('dateLabel')
    .get(function() {
        return moment(this.createdAt).format('DD.MM.YYYY');
    });

Payment.virtual('statusLabel')
    .get(function() {
        return PaymentStatusLabel[this.status];
    });

Payment.virtual('statusIcon')
    .get(function() {
        return PaymentStatusIcon[this.status];
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
    return this.isPending && !this.confirmation;
});

Payment.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

Payment.methods.getResolveUrl = function(paymentId) {
    return this.subscriptionId ?
        `/user/subscription/resolve?paymentId=${paymentId}` :
        `/user/payments/${paymentId}`;
};

Payment.methods.toData = function() {
    return this.toObject();
};

export default Payment;