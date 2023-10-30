const { Schema } = require('mongoose');

const Teacher = new Schema({
    type: { type: String },
    levels: { type: [String] },
    formats: { type: [String] },
    ageGroups: { type: [String] },
    zoomUrl: { type: String }
});

Teacher.virtual('enrollments', {
    ref: 'Enrollment',
    localField: '_id',
    foreignField: 'teacherId'
});

Teacher.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'teacherId'
});

Teacher.virtual('meetings', {
    ref: 'Meeting',
    localField: '_id',
    foreignField: 'hostId'
});

module.exports = Teacher;