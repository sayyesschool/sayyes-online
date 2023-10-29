const { Schema } = require('mongoose');

const Subtask = new Schema({
    title: String,
    completed: Boolean
});

const Task = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    dueAt: { type: Date },
    remindAt: { type: Date },
    subtasks: [Subtask],
    note: { type: String },
    manager: { type: Schema.Types.ObjectId, ref: 'Manager' },
    client: { type: Schema.Types.ObjectId, ref: 'Client' }
}, {
    timestamps: true
});

module.exports = Task;