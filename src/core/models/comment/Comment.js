import moment from 'moment';
import { Schema, Types } from 'mongoose';

const { ObjectId } = Types;

export const Comment = new Schema({
    content: { type: String, required: true },
    authorId: { type: ObjectId, required: true },
    itemId: { type: ObjectId, required: true }
}, {
    timestamps: true
});

Comment.virtual('author', {
    ref: 'User',
    localField: 'authorId',
    foreignField: '_id',
    justOne: true
});

Comment.virtual('datetimeLabel').get(function() {
    return moment(this.createdAt).tz('Europe/Moscow').format('D MMM YYYY в H:mm');
});

export default Comment;