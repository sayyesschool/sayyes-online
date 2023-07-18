const { Schema } = require('mongoose');

const Image = require('../image');

const Unit = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: Image },
    _lessons: [Schema.Types.ObjectId]
});

Unit.virtual('uri').get(function() {
    return `${this.parent().uri}/units/${this.id}`;
});

Unit.virtual('url').get(function() {
    return this.uri;
});

Unit.virtual('courseId').get(function() {
    return this.parent()?.id;
});

Unit.virtual('imageUrl').get(function() {
    return this.image?.url || `${process.env.STORAGE_URL}/courses/${this.courseId}/images/${this.id}.webp`;
});

module.exports = Unit;