const { Schema } = require('mongoose');

const Image = require('../image');

const Vocabulary = new Schema({
    title: { type: String },
    description: { type: String },
    image: { type: Image },
    courseId: { type: Schema.Types.ObjectId },
    learnerId: { type: Schema.Types.ObjectId },
    teacherId: { type: Schema.Types.ObjectId },
    lexemeIds: [{ type: Schema.Types.ObjectId }]
}, {
    timestamps: true
});

Vocabulary.virtual('numberOfItems').get(function() {
    return this.lexemes.length;
});

module.exports = Vocabulary;