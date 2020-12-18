const { Schema } = require('mongoose');
const moment = require('moment');

const Message = require('../message');

const Status = {
    assigned: 'assigned',
    submitted: 'submitted',
    pending: 'pending',
    completed: 'completed'
};

const Assignment = new Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, default: '' },
    published: { type: Boolean, default: true },
    status: { type: String, enum: Object.keys(Status), default: Status.assigned },
    comments: [Message],
    client: { type: Schema.Types.ObjectId, ref: 'User' },
    teacher: { type: Schema.Types.ObjectId, ref: 'User' },
    enrollment: { type: Schema.Types.ObjectId, ref: 'Enrollment' },
    dueAt: { type: Date }
}, {
    timestamps: true
});

Assignment.virtual('url').get(function() {
    return `/assignments/${this.id}`;
});

Assignment.virtual('uri').get(function() {
    return `/assignments/${this.id}`;
});

Assignment.virtual('statusLabel').get(function() {
    switch (this.status) {
        case Status.assigned: return 'Задано';
        case Status.submitted: return 'Сдано';
        case Status.pending: return 'Проверяется';
        case Status.completed: return 'Выполнено';
    }
});

Assignment.virtual('statusIcon').get(function() {
    switch (this.status) {
        case Status.assigned: return 'assignment_return';
        case Status.submitted: return 'assignment_returned';
        case Status.pending: return 'pending_actions';
        case Status.completed: return 'assignment_turned_in';
    }
});

Assignment.virtual('timeSinceCreated')
    .get(function() {
        return moment(this.createdAt).fromNow();
    });

Assignment.virtual('timeToDue')
    .get(function() {
        return moment(this.dueAt).fromNow();
    });

module.exports = Assignment;