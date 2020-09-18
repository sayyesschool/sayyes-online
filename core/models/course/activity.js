const { Schema } = require('mongoose');

const Exercise = require('./exercise');

const Activity = new Schema({
    slug: { type: String },
    title: { type: String },
    exercises: [Exercise]
});

module.exports = Activity;