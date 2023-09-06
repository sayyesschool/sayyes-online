const { Schema } = require('mongoose');

const Comment = require('../comment');

const ObjectId = Schema.Types.ObjectId;

const Progress = new Schema({
    enrollmentId: { type: ObjectId, required: true },
    courseId: { type: ObjectId, required: true },
    exerciseId: { type: ObjectId, required: true },
    completed: { type: Boolean, default: false },
    state: { type: Object },
    comments: { type: [Comment] }
}, {
    timestamps: true
});

module.exports = Progress;