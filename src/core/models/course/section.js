const { Schema } = require('mongoose');

const Section = new Schema({
    unitId: { type: Schema.Types.ObjectId, required: true },
    lessonId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    _exercises: [Schema.Types.ObjectId]
});

Section.virtual('uri').get(function() {
    return `${this.parent().uri}/sections/${this.id}`;
});

Section.virtual('url').get(function() {
    return `${this.parent().uri}/sections/${this.slug}`;
});

Section.virtual('courseId').get(function() {
    return this.parent()?.id;
});

Section.virtual('exercises', {
    ref: 'Exercise',
    localField: '_exercises',
    foreignField: '_id'
});

module.exports = Section;