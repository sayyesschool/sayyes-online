const { Schema } = require('mongoose');
const moment = require('moment');

const ObjectId = Schema.Types.ObjectId;

const Comment = new Schema({
    user: { type: ObjectId, ref: 'User' },
    content: { type: String, required: true },
    ref: {
        type: Schema.Types.ObjectId,
        refPath: 'refModel'
    },
    refModel: {
        type: String,
        enum: ['Client', 'Enrollment', 'Post']
    }
}, {
    timestamps: true
});

Comment.virtual('datetime').get(function() {
    return moment(this.createdAt).tz('Europe/Moscow').fromNow();
});

Comment.virtual('publishedAt').get(function() {
    return moment(this.createdAt).fromNow();
});

module.exports = Comment;