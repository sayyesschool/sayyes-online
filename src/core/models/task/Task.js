import { Schema, Types } from 'mongoose';

import { PriorityLabel, TopicLabel } from 'shared/data/task';
import datetime from 'shared/libs/datetime';

import { Comment } from './Comment';
import { Priority, Status, Topic } from './constants';

const { ObjectId } = Types;

export const Task = new Schema({
    topic: { type: String, default: Topic.Other },
    description: { type: String, trim: true, default: '' },
    completed: { type: Boolean, default: Status.Open },
    priority: { type: String, default: Priority.Medium },
    dueDate: { type: Date },
    reminderDate: { type: Date },
    comments: [Comment],
    refs: [{
        id: ObjectId,
        entity: String
    }],
    ownerId: { type: ObjectId, required: true },
    assigneeId: { type: ObjectId },
    assignerId: { type: ObjectId }
}, {
    timestamps: true
});

Task.virtual('owner', {
    ref: 'User',
    localField: 'ownerId',
    foreignField: '_id',
    justOne: true
});

Task.virtual('assignee', {
    ref: 'User',
    localField: 'assigneeId',
    foreignField: '_id',
    justOne: true
});

Task.virtual('lastComment').get(function() {
    return this.comments.length
        ? this.comments[0]
        : null;
});

Task.virtual('topicLabel').get(function() {
    return TopicLabel[this.topic];
});

Task.virtual('priorityLabel').get(function() {
    return PriorityLabel[this.priority];
});

Task.virtual('dueDateLabel').get(function () {
    return this.dueDate && datetime(this.dueDate).tz('Europe/Moscow').format('DD.MM.YYYY');
});

Task.virtual('reminderDateLabel').get(function () {
    return this.reminderDate && datetime(this.reminderDate).tz('Europe/Moscow').format('DD.MM.YYYY H:mm МСК');
});

Task.methods.toData = function() {
    return this.toObject();
};

export default Task;