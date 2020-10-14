const { Schema } = require('mongoose');

const Lesson = new Schema({
    slug: { type: String, required: true },
    title: { type: String },
    image: { type: String },
    _exercises: [Schema.Types.ObjectId]
});

Lesson.virtual('imageUrl').get(function() {
    return this.image && `https://static.sayes.ru/courses/${this.parent().slug}/images/${this.image}`;
});

module.exports = Lesson;