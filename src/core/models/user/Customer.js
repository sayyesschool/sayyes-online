const { Schema } = require('mongoose');

const Contact = require('./Contact');

const Customer = new Schema({
    balance: { type: Number, default: 0 },
    altPhone: {
        type: String,
        trim: true,
        maxlength: 12,
        set: value => value.trim().replace(/[\s()\-\+]+/g, '')
    },
    address: { type: String },
    occupation: { type: String },
    interests: { type: String },
    contacts: { type: [Contact] },
    teacherNote: { type: String }
});

Customer.virtual('status').get(function() {
    return this.enrollments?.some(enrollment => enrollment.isActive)?.status;
});

Customer.virtual('requests', {
    ref: 'Request',
    localField: '_id',
    foreignField: 'client'
});

Customer.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'client'
});

Customer.virtual('enrollments', {
    ref: 'Enrollment',
    localField: '_id',
    foreignField: 'client'
});

module.exports = Customer;