const { Schema, model } = require('mongoose');

const Question = new Schema({
    type: { type: String, enum: ['single', 'multiple', 'fill', 'open'] },
    text: { type: String, default: '' },
    image: { type: String },
    audio: { type: String },
    video: { type: String },
    options: [String],
    answers: [{ type: Number }],
    topic: { type: String },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    points: { type: Number },
    tip: { type: String }
});

const Quiz = new Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true },
    description: { type: String, default: '', trim: true },
    published: { type: Boolean, default: false, alias: 'isPublished' },
    tries: { type: Number },
    questions: [Question]
});


Quiz.virtual('url').get(function() {
    return `/quizzes/${this.slug}`;
});


module.exports = model('Quiz', Quiz);