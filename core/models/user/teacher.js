const { Schema } = require('mongoose');

const Teacher = new Schema({
    languages: { type: [String] },
    levels: { type: [String] },
    formats: { type: [String] },
    ages: { type: [String] }
});

Teacher.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'teacher'
});

Teacher.virtual('meetings', {
    ref: 'Meeting',
    localField: '_id',
    foreignField: 'teacher'
});

module.exports = Teacher;