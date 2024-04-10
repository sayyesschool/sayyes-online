const { Schema } = require('mongoose');

const VocabularyItem = require('./VocabularyItem');

const Vocabulary = new Schema({
    title: { type: String },
    description: { type: String },
    courseId: { type: Schema.Types.ObjectId },
    learnerId: { type: Schema.Types.ObjectId },
    teacherId: { type: Schema.Types.ObjectId },
    items: [VocabularyItem]
}, {
    timestamps: true
});

module.exports = Vocabulary;