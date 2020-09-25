const { Schema, model } = require('mongoose');

const Unit = require('./unit');
const Lesson = require('./lesson');
const Exercise = require('./exercise');

const Course = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    level: { type: String },
    duration: { type: String },
    price: { type: Number },
    units: [Unit],
    lessons: [Lesson],
    exercises: [Exercise]
});

module.exports = model('Course', Course);