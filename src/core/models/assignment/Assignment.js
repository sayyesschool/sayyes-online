import { Schema } from 'mongoose';

export const AssignmentStatus = {
    Assigned: 'assigned',
    Submitted: 'submitted',
    Completed: 'completed'
};

export const Assignment = new Schema({
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

Assignment.virtual('learner', {
    ref: 'Learner',
    localField: 'learnerId',
    foreignField: '_id',
    justOne: true
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

Assignment.virtual('isAssigned').get(function() {
    return this.status === AssignmentStatus.Assigned;
});

Assignment.virtual('isCompleted').get(function() {
    return this.status === AssignmentStatus.Completed;
});

Assignment.virtual('isSubmitted').get(function() {
    return this.status === AssignmentStatus.Submitted;
});

export default Assignment;