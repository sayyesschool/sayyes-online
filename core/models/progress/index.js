const { Schema } = require('mongoose');

const Comment = require('../comment');

const ObjectId = Schema.Types.ObjectId;

const Progress = new Schema({
    user: { type: ObjectId, required: true },
    course: { type: ObjectId, required: true },
    exercise: { type: ObjectId, required: true },
    submitted: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    state: { type: Object },
    comments: { type: [Comment] }
}, {
    timestamps: true
});

module.exports = Progress;