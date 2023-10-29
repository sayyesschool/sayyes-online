const { Schema } = require('mongoose');
const moment = require('moment');

const PaymentMethod = require('../payment/PaymentMethod');

const Payment = new Schema({
    id: { type: String },
    gateway: { type: String },
    method: { type: PaymentMethod }
}, {
    id: false,
    _id: false
});

const Transaction = new Schema({
    type: { type: String, required: true, enum: ['debit', 'credit'] },
    amount: { type: Number, default: 0, min: 0, required: true },
    currency: { type: String, default: 'RUB' },
    description: { type: String, trim: true },
    payment: { type: Payment, default: undefined },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    enrollment: { type: Schema.Types.ObjectId, ref: 'Enrollment' }
}, {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true }
});

Transaction.virtual('value').get(function() {
    return this.type === 'credit' ? -this.amount : this.amount;
});

Transaction.virtual('dateLabel').get(function() {
    return moment(this.createdAt).format('DD.MM.YYYY');
});

module.exports = Transaction;