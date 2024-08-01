import { Schema } from 'mongoose';

export const Subtask = new Schema({
    title: String,
    completed: Boolean
});

export const Task = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    dueAt: { type: Date },
    remindAt: { type: Date },
    subtasks: [Subtask],
    note: { type: String },
    manager: { type: Schema.Types.ObjectId, ref: 'Manager' },
    learner: { type: Schema.Types.ObjectId, ref: 'Learner' }
}, {
    timestamps: true
});

export default Task;