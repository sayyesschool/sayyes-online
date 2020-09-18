const { Schema } = require('mongoose');
const moment = require('moment');

const Message = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, {
    timestamps: true
});

Message.virtual('datetime').get(function() {
    return moment(this.createdAt).tz('Europe/Moscow').fromNow();
});

module.exports = Message;