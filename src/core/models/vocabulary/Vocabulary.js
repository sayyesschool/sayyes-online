import { Schema } from 'mongoose';

import Image from '../image';

const VocabularyType = {
    Default: 'default',
    Custom: 'custom',
    Course: 'course',
    Extra: 'extra'
};

export const Vocabulary = new Schema({
    type: {
        type: String,
        enum: Object.values(VocabularyType),
        default: VocabularyType.Default
    },
    title: { type: String },
    description: { type: String },
    image: { type: Image },
    published: { type: Boolean, default: false },
    courseId: { type: Schema.Types.ObjectId },
    learnerId: { type: Schema.Types.ObjectId },
    teacherId: { type: Schema.Types.ObjectId },
    lexemeIds: [{ type: Schema.Types.ObjectId }]
}, {
    timestamps: true
});

Vocabulary.virtual('url').get(function() {
    return `/vocabularies/${this._id}`;
});

Vocabulary.virtual('numberOfLexemes').get(function() {
    return this.lexemeIds?.length;
});

Vocabulary.virtual('lexemes', {
    ref: 'Lexeme',
    localField: 'lexemeIds',
    foreignField: '_id'
});

Vocabulary.methods.hasLexeme = function(lexemeId) {
    this.lexemeIds.includes(lexemeId);
};

Vocabulary.methods.addLexeme = async function(lexemeId) {
    this.lexemeIds.addToSet(lexemeId);

    return this.save();
};

Vocabulary.methods.removeLexeme = async function(lexemeId) {
    if (!this.lexemeIds.some(id => id.equals(lexemeId)))
        throw new Error('Lexeme is not in the vocabulary');

    this.lexemeIds.remove(lexemeId);

    return this.save();
};

export default Vocabulary;