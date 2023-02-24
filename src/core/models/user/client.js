const { Schema } = require('mongoose');

const Contact = require('./contact');

const Client = new Schema({
    balance: { type: Number },
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

Client.virtual('status').get(function() {
    return this.enrollments?.some(enrollment => enrollment.isActive)?.status;
});

Client.virtual('requests', {
    ref: 'Request',
    localField: '_id',
    foreignField: 'client'
});

Client.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'client'
});

Client.virtual('enrollments', {
    ref: 'Enrollment',
    localField: '_id',
    foreignField: 'client'
});

Client.virtual('enrollments', {
    ref: 'Enrollment',
    localField: '_id',
    foreignField: 'client'
});

module.exports = Client;