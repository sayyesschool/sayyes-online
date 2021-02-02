const { Schema } = require('mongoose');

const Client = new Schema();

Client.virtual('status').get(function() {
    return this.enrollments?.some(enrollment => enrollment.isActive);
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