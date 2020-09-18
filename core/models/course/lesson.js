const { Schema } = require('mongoose');

const Activity = require('./activity');

const Lesson = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String },
    activities: [Activity]
});

module.exports = Lesson;