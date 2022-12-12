const { Schema } = require('mongoose');

const Comment = require('../comment');

const ObjectId = Schema.Types.ObjectId;

const Progress = new Schema({
    enrollment: { type: ObjectId, required: true, alias: 'enrollmentId' },
    course: { type: ObjectId, required: true, alias: 'courseId' },
    exercise: { type: ObjectId, required: true, alias: 'exerciseId' },
    submitted: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    state: { type: Object },
    comments: { type: [Comment] }
}, {
    timestamps: true
});

module.exports = Progress;