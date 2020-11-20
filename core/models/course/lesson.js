const { Schema } = require('mongoose');

const Lesson = new Schema({
    slug: { type: String, required: true },
    title: { type: String },
    document: { type: String },
    image: { type: String },
    _unit: { type: Schema.Types.ObjectId },
    _exercises: [Schema.Types.ObjectId]
});

Lesson.virtual('documentUrl').get(function() {
    return this.document && `https://static.sayes.ru${this.parent().url}/documents/${this.document}`;
});

Lesson.virtual('imageUrl').get(function() {
    return this.image && `https://static.sayes.ru${this.parent().url}/images/${this.image}`;
});

module.exports = Lesson;