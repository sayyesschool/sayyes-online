const { Schema } = require('mongoose');

const Teacher = new Schema({
    level: { type: String }
});

Teacher.virtual('meetings', {
    ref: 'Meeting',
    localField: '_id',
    foreignField: 'teacher'
});

module.exports = Teacher;