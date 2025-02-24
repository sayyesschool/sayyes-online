import { Schema } from 'mongoose';

import datetime from 'shared/libs/datetime';

import { Customer, UTM } from '../common';

import {
    PaymentOperator,
    PaymentPurpose,
    PaymentStatus,
    PaymentStatusIcon,
    PaymentStatusLabel
} from './constants';
import PaymentMethod from './PaymentMethod';

export const Payment = new Schema({
    uuid: { type: String },
    amount: { type: Number, default: 0, min: 0, required: true },
    currency: { type: String, default: 'RUB' },
    description: { type: String, trim: true },
    status: {
        type: String,
        enum: Object.values(PaymentStatus),
        required: true
    },
    operator: {
        type: String,
        enum: Object.values(PaymentOperator)
    },
    purpose: {
        type: String,
        enum: Object.values(PaymentPurpose)
    },
    customer: Customer,
    method: PaymentMethod,
    paid: { type: Boolean, default: false, alias: 'isPaid' },
    refundable: { type: Boolean, default: false },
    refunded: { type: Boolean, default: false },
    test: { type: Boolean, default: false },
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
    data: { type: Object },
    utm: { type: UTM },
    expiresAt: { type: Date },
    paidAt: { type: Date },
    processedAt: { type: Date },
    userId: { type: Schema.Types.ObjectId },
    requestId: { type: Schema.Types.ObjectId }
}, {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true }
});

Payment.statics.Status = PaymentStatus;
Payment.statics.Purpose = PaymentPurpose;

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

Payment.virtual('date').get(function() {
    return this.paidAt || this.createdAt;
});

Payment.virtual('dateLabel')
    .get(function() {
        return datetime(this.createdAt).format('DD.MM.YYYY');
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

Payment.virtual('isProcessed').get(function() {
    return Boolean(this.processedAt) && this.status !== 'pending';
});

Payment.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

Payment.methods.toData = function() {
    return this.toObject();
};

export default Payment;