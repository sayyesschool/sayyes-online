import { Schema } from 'mongoose';

import datetime from 'shared/libs/datetime';

export const Transaction = new Schema({
    type: { type: String, required: true, enum: ['debit', 'credit'] },
    amount: { type: Number, default: 0, min: 0, required: true },
    currency: { type: String, default: 'RUB' },
    description: { type: String, trim: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    paymentId: { type: Schema.Types.ObjectId },
    enrollmentId: { type: Schema.Types.ObjectId }
}, {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true }
});

Transaction.virtual('value').get(function() {
    return this.type === 'credit' ? -this.amount : this.amount;
});

Transaction.virtual('dateLabel').get(function() {
    return datetime(this.createdAt).format('DD.MM.YYYY');
});

Transaction.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

Transaction.virtual('payment', {
    ref: 'Payment',
    localField: 'paymentId',
    foreignField: '_id',
    justOne: true
});

Transaction.virtual('enrollment', {
    ref: 'Enrollment',
    localField: 'enrollmentId',
    foreignField: '_id',
    justOne: true
});

export default Transaction;