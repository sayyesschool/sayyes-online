const { Schema } = require('mongoose');

const Contact = require('./Contact');

const Learner = new Schema({
    level: { type: String },
    info: {
        address: { type: String },
        occupation: { type: String },
        interests: { type: String },
        contacts: { type: [Contact] }
    }
});

Learner.virtual('balance').get(function() {
    return this.transactions?.reduce((result, transaction) => result + transaction.value, 0);
});

Learner.virtual('status').get(function() {
    return this.enrollments?.some(enrollment => enrollment.isActive)?.status;
});

Learner.virtual('assignments', {
    ref: 'Assignment',
    localField: '_id',
    foreignField: 'learnerId'
});

Learner.virtual('enrollments', {
    ref: 'Enrollment',
    localField: '_id',
    foreignField: 'learnerId'
});

Learner.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'learnerId'
});

Learner.virtual('payments', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'userId'
});

Learner.virtual('requests', {
    ref: 'Request',
    localField: '_id',
    foreignField: 'learnerId'
});

Learner.virtual('transactions', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'userId'
});

module.exports = Learner;