const { Schema } = require('mongoose');

const Client = new Schema();

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

Client.virtual('payments', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'client'
});

Client.virtual('enrollments', {
    ref: 'Enrollment',
    localField: '_id',
    foreignField: 'client'
});

module.exports = Client;