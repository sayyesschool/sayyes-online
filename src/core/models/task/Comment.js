import { randomUUID } from 'node:crypto';

import { Schema, Types } from 'mongoose';

export const Comment = new Schema({
    id: { type: Types.UUID, required: true, default: randomUUID },
    content: { type: String, trim: true, required: true },
    authorId: { type: Types.ObjectId, required: true }
}, {
    timestamps: true
});

Comment.virtual('author', {
    ref: 'User',
    localField: 'authorId',
    foreignField: '_id',
    justOne: true
});