import { Schema, Types } from 'mongoose';

export const Comment = new Schema({
    content: { type: String, trim: true, required: true },
    authorId: { type: Types.ObjectId, required: true }
});

Comment.virtual('author', {
    ref: 'User',
    localField: 'authorId',
    foreignField: '_id',
    justOne: true
});