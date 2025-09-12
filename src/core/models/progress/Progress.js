import { Schema, Types } from 'mongoose';

const { ObjectId } = Types;

export const Progress = new Schema({
    enrollmentId: { type: ObjectId, required: true },
    courseId: { type: ObjectId, required: true },
    exerciseId: { type: ObjectId, required: true },
    status: {
        type: Number,
        min: 0,
        max: 2,
        default: 0
    },
    state: { type: Object }
}, {
    timestamps: true
});

Progress.virtual('isCompleted').get(function() {
    return this.status === 1;
});

Progress.virtual('isChecked').get(function() {
    return this.status === 2;
});

export default Progress;