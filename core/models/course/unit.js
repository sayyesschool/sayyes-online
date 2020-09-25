const { Schema } = require('mongoose');

const Lesson = require('./lesson');

const Unit = new Schema({
    slug: { type: String },
    title: { type: String },
    image: { type: String },
    document: { type: String },
    images: [{ type: String }],
    audios: [{ type: String }],
    videos: [{
        filename: String,
        title: String
    }],
    lessons: [Lesson]
});

module.exports = Unit;