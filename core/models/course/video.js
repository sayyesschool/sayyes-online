const { Schema } = require('mongoose');

const Video = new Schema({
    filename: String,
    title: String,
    duration: String
});

Video.virtual('url').get(function() {
    const parent = this.parent();

    return `https://static.sayes.ru${parent ? parent.url : ''}/videos/${this.filename}`;
});

module.exports = Video;