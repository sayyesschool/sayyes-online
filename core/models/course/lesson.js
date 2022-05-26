const { Schema } = require('mongoose');

const Image = require('./image');

const Lesson = new Schema({
    slug: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    content: { type: String },
    image: { type: Image },
    _unit: { type: Schema.Types.ObjectId, alias: 'unitId' },
    _exercises: [Schema.Types.ObjectId]
}, {
    toJSON: {
        transform: (lesson, object) => {
            delete object._unit;

            return object;
        }
    }
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
    return this.image?.url;
});

module.exports = Lesson;