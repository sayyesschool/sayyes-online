import { Schema, Types } from 'mongoose';

import datetime from 'shared/libs/datetime';

const { ObjectId } = Types;

export const Contract = new Schema({
    lessonPrice: { type: Number, default: 0 },
    learnerId: { type: ObjectId, required: true },
    enrollmentIds: [{ type: ObjectId }]
}, {
    timestamps: true
});

Contract.virtual('learner', {
    ref: 'User',
    localField: 'authorId',
    foreignField: '_id',
    justOne: true
});

Contract.virtual('datetimeLabel').get(function() {
    return datetime(this.createdAt).tz('Europe/Moscow').format('D MMM YYYY в H:mm');
});

export default Contract;