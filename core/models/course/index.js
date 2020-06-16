const { Schema } = require('mongoose');



const Lesson = new Schema({
    slug: { title: String, required: true, unique: true },
    title: { type: String },
    contents: []
});

const Unit = new Schema({
    slug: { title: String, required: true, unique: true },
    title: { type: String },
    lessons: [Lesson]
});

const Course = new Schema({
    slug: { title: String, required: true, unique: true },
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    level: { type: String },
    duration: { type: String },
    price: { type: Number },
    units: [Unit]
});

module.exports = Course;