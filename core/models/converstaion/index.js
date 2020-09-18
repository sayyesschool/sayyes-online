const { Schema, model } = require('mongoose');

const Message = require('./message');

const Conversation = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [Message],
    ref: { type: Schema.Types.ObjectId }
}, {
    timestamps: true
});

module.exports = model('Conversation', Conversation);