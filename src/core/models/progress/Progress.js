import { Schema, Types } from 'mongoose';

const { ObjectId } = Types;

export const Progress = new Schema({
    enrollmentId: { type: ObjectId, required: true },
    courseId: { type: ObjectId, required: true },
    exerciseId: { type: ObjectId, required: true },
    completed: { type: Boolean, default: false },
    state: { type: Object }
}, {
    timestamps: true
});

export default Progress;