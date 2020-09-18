const { Schema } = require('mongoose');

const PaymentMethod = new Schema({
    id: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String },
    saved: { type: Boolean },
    card: {
        type: { type: String },
        number: { type: String }
    }
}, {
    _id: false,
    toJSON: { virtuals: true }
});

PaymentMethod.virtual('card.title').get(function() {
    return `${this.card.type} *${this.card.number}`;
});

module.exports = PaymentMethod;