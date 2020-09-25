const { Schema } = require('mongoose');

const Exercise = require('./exercise');

const Lesson = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String },
    exercises: [Exercise]
});

module.exports = Lesson;