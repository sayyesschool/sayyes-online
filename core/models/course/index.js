const { Schema } = require('mongoose');

const Exercise = require('./exercise');
const Image = require('./image');
const Lesson = require('./lesson');
const Unit = require('./unit');

const Course = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    level: { type: String },
    duration: { type: String },
    image: { type: Image },
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
    return this.image?.url;
});

Course.virtual('progress', {
    ref: 'Progress',
    localField: '_id',
    foreignField: 'course'
});

module.exports = Course;