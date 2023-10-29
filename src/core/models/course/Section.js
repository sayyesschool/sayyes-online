const { Schema } = require('mongoose');

const Section = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    _unit: { type: Schema.Types.ObjectId, required: true },
    _lesson: { type: Schema.Types.ObjectId, required: true },
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

Section.virtual('unitId')
    .get(function() {
        return this._unit;
    })
    .set(function(value) {
        this._unit = value;
    });

Section.virtual('lessonId')
    .get(function() {
        return this._lesson;
    })
    .set(function(value) {
        this._lesson = value;
    });

Section.virtual('exercises', {
    ref: 'Exercise',
    localField: '_exercises',
    foreignField: '_id'
});

module.exports = Section;