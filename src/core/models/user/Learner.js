const { Schema } = require('mongoose');

const Learner = new Schema({
    level: { type: String }
});

Learner.virtual('enrollments', {
    ref: 'Enrollment',
    localField: '_id',
    foreignField: 'learner'
});

Learner.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'learner'
});

Learner.virtual('payments', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'user'
});

module.exports = Learner;