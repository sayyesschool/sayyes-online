const { Schema } = require('mongoose');

const Student = new Schema({
    level: { type: String }
});

Student.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'student'
});

Student.virtual('payments', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'user'
});

module.exports = Student;