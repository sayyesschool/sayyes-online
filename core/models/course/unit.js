const { Schema } = require('mongoose');

const Lesson = require('./lesson');

const Unit = new Schema({
    slug: { type: String },
    title: { type: String },
    lessons: [Lesson]
});

module.exports = Unit;