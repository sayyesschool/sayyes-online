const { Schema } = require('mongoose');
const moment = require('moment');

const Message = require('../message');

const Post = new Schema({
    title: { type: String, trim: true },
    content: { type: String, default: '' },
    published: { type: Boolean, default: true },
    comments: [Message],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    enrollment: { type: Schema.Types.ObjectId, ref: 'Enrollment' }
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


Post.virtual('dateCreated')
    .get(function() {
        return moment(this.createdAt).format('DD.MM.YY');
    });

Post.virtual('timeSinceCreated')
    .get(function() {
        return moment(this.createdAt).fromNow();
    });

Post.methods.isAuthor = function(user) {
    return this.author.id === user.id;
};

module.exports = Post;