const { Schema } = require('mongoose');

const Unit = require('./unit');
const Lesson = require('./lesson');
const Exercise = require('./exercise');
const Audio = require('./audio');
const Video = require('./video');

const Course = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    level: { type: String },
    duration: { type: String },
    image: { type: String },
    audios: [Audio],
    videos: [Video],
    units: [Unit],
    lessons: [Lesson],
    exercises: [Exercise]
});

Course.virtual('uri').get(function() {
    return `/courses/${this.id}`;
});

Course.virtual('url').get(function() {
    return `/courses/${this.slug}`;
});

Course.virtual('imageUrl').get(function() {
    return this.image && `https://static.sayes.ru${this.url}/images/${this.image}`;
});

module.exports = Course;