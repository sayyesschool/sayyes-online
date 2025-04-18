import { Schema } from 'mongoose';

export const PaymentMethod = new Schema({
    id: { type: String, required: true },
    type: { type: String, required: true },
    saved: { type: Boolean },
    card: {
        type: { type: String },
        first6: { type: String },
        last4: { type: String },
        expiryMonth: { type: String },
        expiryYear: { type: String },
        issuerName: { type: String },
        issuerCountry: { type: String }
    }
}, {
    _id: false,
    toJSON: { virtuals: true }
});

PaymentMethod.virtual('card.title').get(function() {
    return `${this.card.type} *${this.card.last4}`;
});

PaymentMethod.virtual('card.number').get(function() {
    return `**** **** **** ${this.card.last4}`;
});

export default PaymentMethod;