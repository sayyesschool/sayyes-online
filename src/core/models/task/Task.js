import { Schema, Types } from 'mongoose';

import { Priority, Theme } from 'core/models/common';

import { PriorityLabel, ThemeLabel } from 'shared/data/common';
import datetime from 'shared/libs/datetime';

const { ObjectId } = Types;

const Comment = new Schema({
    content: { type: String, trim: true, required: true },
    authorId: { type: ObjectId, required: true },
    createdAt: { type: Date, required: true }
});

Comment.virtual('author', {
    ref: 'User',
    localField: 'authorId',
    foreignField: '_id',
    justOne: true
});

export const Task = new Schema({
    theme: { type: String, default: Theme.Other },
    completed: { type: Boolean, default: false },
    dueAt: { type: Date },
    remindAt: { type: Date },
    note: { type: String, trim: true, default: '' },
    comments: [Comment],
    priority: { type: String, default: Priority.Medium },
    refs: [{
        id: ObjectId,
        entity: String
    }],
    enrollmentId: { type: ObjectId },
    performer: { type: ObjectId, required: true },
    createdBy: { type: ObjectId }
}, {
    timestamps: true
});

Task.virtual('manager', {
    ref: 'Manager',
    localField: 'performer',
    foreignField: '_id',
    justOne: true
});

Task.virtual('lastComment').get(function() {
    return this.comments.length
        ? this.comments[0]
        : null;
});

Task.virtual('themeLabel').get(function() {
    return ThemeLabel[this.theme];
});

Task.virtual('dueDateLabel').get(function () {
    return this.dueAt
        ? {
            date: datetime(this.dueAt).tz('Europe/Moscow').format('DD.MM.YYYY'),
            time: datetime(this.dueAt).tz('Europe/Moscow').format('H:mm МСК')
        }
        : { noDate: 'Бессрочная' };
});

Task.virtual('remindDateLabel').get(function () {
    return this.remindAt
        ? {
            date: datetime(this.remindAt).tz('Europe/Moscow').format('DD.MM.YYYY'),
            time: datetime(this.remindAt).tz('Europe/Moscow').format('H:mm МСК')
        }
        : { noDate: 'Без напоминания' };
});

Task.virtual('priorityLabel').get(function() {
    return PriorityLabel[this.priority];
});

Task.methods.toData = function() {
    return this.toObject();
};

export default Task;