const { Schema } = require('mongoose');

const Image = require('./image');

const Lesson = new Schema({
    unitId: { type: Schema.Types.ObjectId, required: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    image: { type: Image },
    _sections: [Schema.Types.ObjectId],
    _exercises: [Schema.Types.ObjectId]
});

Lesson.virtual('uri').get(function() {
    return `${this.parent().uri}/lessons/${this.id}`;
});

Lesson.virtual('url').get(function() {
    return `${this.parent().url}/lessons/${this.slug}`;
});

Lesson.virtual('courseId').get(function() {
    return this.parent()?.id;
});

Lesson.virtual('imageUrl').get(function() {
    return this.image?.url || `${process.env.STORAGE_URL}/courses/${this.courseId}/images/${this.id}.jpg`;
});

module.exports = Lesson;