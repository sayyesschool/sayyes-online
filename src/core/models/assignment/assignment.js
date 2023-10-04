const { Schema } = require('mongoose');

const Assignment = new Schema({
    courseId: { type: Schema.Types.ObjectId, required: true },
    enrollmentId: { type: Schema.Types.ObjectId, required: true },
    teacherId: { type: Schema.Types.ObjectId, required: true },
    learnerId: { type: Schema.Types.ObjectId, required: true },
    exercises: { type: [Schema.Types.ObjectId], ref: 'Exercise' },
    status: { type: String, enum: ['assigned', 'submitted', 'completed'] },
    title: { type: String },
    content: { type: String },
    dueAt: { type: Date }
}, {
    timestamps: true
});

Assignment.virtual('uri').get(function() {
    return `/assignments/${this.id}`;
});

Assignment.virtual('url').get(function() {
    return this.uri;
});

module.exports = Assignment;