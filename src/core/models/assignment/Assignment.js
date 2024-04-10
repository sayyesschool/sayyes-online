const { Schema } = require('mongoose');

const AssignmentStatus = {
    Assigned: 'assigned',
    Submitted: 'submitted',
    Completed: 'completed'
};

const Assignment = new Schema({
    title: { type: String },
    content: { type: String },
    status: { type: String, enum: Object.values(AssignmentStatus) },
    dueDate: { type: Date },
    exerciseIds: { type: [Schema.Types.ObjectId] },
    enrollmentId: { type: Schema.Types.ObjectId, required: true },
    learnerId: { type: Schema.Types.ObjectId, required: true },
    teacherId: { type: Schema.Types.ObjectId, required: true }
}, {
    timestamps: false
});

Assignment.virtual('url').get(function() {
    return `/assignments/${this.id}`;
});

Assignment.virtual('enrollment', {
    ref: 'Enrollment',
    localField: 'enrollmentId',
    foreignField: '_id',
    justOne: true
});

Assignment.virtual('exercises', {
    ref: 'Exercise',
    localField: 'exerciseIds',
    foreignField: '_id'
});

Assignment.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'itemId'
});

Assignment.virtual('hasExercises').get(function() {
    return this.exerciseIds && this.exerciseIds.length > 0;
});

Assignment.virtual('numberOfExercises').get(function() {
    return this.exerciseIds && this.exerciseIds.length;
});

module.exports = Assignment;