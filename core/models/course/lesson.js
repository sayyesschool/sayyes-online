const { Schema } = require('mongoose');

const Image = require('./image');

const Lesson = new Schema({
    slug: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    content: { type: String },
    image: { type: Image },
    unit: { type: Schema.Types.ObjectId },
    exercises: [Schema.Types.ObjectId]
});

Lesson.virtual('courseId').get(function() {
    return this.parent()?.id;
});

Lesson.virtual('unitId').get(function() {
    return this.unit;
});

Lesson.virtual('uri').get(function() {
    return `${this.parent().uri}/units/${this.unit}/lessons/${this.id}`;
});

Lesson.virtual('url').get(function() {
    return `${this.parent().url}/lessons/${this.slug}`;
});

Lesson.virtual('imageUrl').get(function() {
    return this.image?.url;
});

module.exports = Lesson;