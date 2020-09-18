const { Schema, model } = require('mongoose');

const Unit = require('./unit');

const Course = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    level: { type: String },
    duration: { type: String },
    price: { type: Number },
    units: [Unit]
});

module.exports = model('Course', Course);