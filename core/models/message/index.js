const { Schema } = require('mongoose');
const moment = require('moment');

const ObjectId = Schema.Types.ObjectId;

const Message = new Schema({
    user: { type: ObjectId, ref: 'User' },
    content: { type: String, required: true },
}, {
    timestamps: true
});

Message.virtual('datetime').get(function() {
    return moment(this.createdAt).tz('Europe/Moscow').fromNow();
});

Message.virtual('publishedAt').get(function() {
    return moment(this.createdAt).fromNow();
});

module.exports = Message;