const { Schema } = require('mongoose');

const Lesson = new Schema({
    slug: { type: String, required: true },
    title: { type: String },
    document: { type: String },
    image: { type: String },
    audios: [String],
    videos: [String],
    unit: { type: Schema.Types.ObjectId },
    exercises: [Schema.Types.ObjectId]
});

Lesson.virtual('uri').get(function() {
    return `${this.parent().uri}/units/${this.unit}/lessons/${this.id}`;
});

Lesson.virtual('url').get(function() {
    return `${this.parent().url}/lessons/${this.slug}`;
});

Lesson.virtual('documentUrl').get(function() {
    return this.document && `https://static.sayes.ru${this.parent().url}/documents/${this.document}`;
});

Lesson.virtual('imageUrl').get(function() {
    return this.image && `https://static.sayes.ru${this.parent().url}/images/${this.image}`;
});

module.exports = Lesson;