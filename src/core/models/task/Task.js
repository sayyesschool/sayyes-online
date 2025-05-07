import { Schema } from 'mongoose';

export const Task = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: { type: Number, default: 1 }, // 0 - low, 1 - medium, 2 - high
    date: { type: Date },
    content: { type: String },
    assignedBy: { type: Schema.Types.ObjectId },
    assignedTo: { type: Schema.Types.ObjectId },
    createdBy: { type: Schema.Types.ObjectId },
    refs: [{
        id: Schema.Types.ObjectId,
        type: { type: String }
    }]
}, {
    timestamps: true
});

export default Task;