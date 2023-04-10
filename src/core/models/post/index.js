const { Schema } = require('mongoose');
const moment = require('moment');

const Comment = require('../comment');

const Post = new Schema({
    title: { type: String, trim: true },
    content: { type: String, default: '' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    enrollment: { type: Schema.Types.ObjectId, ref: 'Enrollment' },
    comments: [Comment]
}, {
    timestamps: true
});

Post.virtual('url').get(function() {
    return `/posts/${this.id}`;
});

Post.virtual('uri').get(function() {
    return `/posts/${this.id}`;
});

Post.virtual('statusLabel').get(function() {
    return this.read ? 'Ознакомлен' : 'Новый';
});

Post.virtual('statusIcon').get(function() {
    return this.read ? 'check_circle' : 'new_releases';
});


Post.virtual('formattedDate').get(function() {
    return moment(this.createdAt).format('DD.MM.YY');
});

Post.virtual('formattedDateTime').get(function() {
    return moment(this.createdAt).tz('Europe/Moscow').format('D MMM YYYY в H:mm');
});

Post.virtual('timeSinceCreated').get(function() {
    return moment(this.createdAt).fromNow();
});

Post.methods.isAuthor = function(user) {
    return this.user.id === user.id;
};

module.exports = Post;