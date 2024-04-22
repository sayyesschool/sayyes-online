import { Schema } from 'mongoose';

import Audio from '../audio';
import { Level } from '../common';
import Image from '../image';

import { LexemeType } from './constants';

const TextWithTranslation = new Schema({
    text: { type: String, require: true },
    translation: { type: String }
});

export const Lexeme = new Schema({
    value: { type: String, required: true },
    type: {
        type: String,
        enum: Object.values(LexemeType),
        default: LexemeType.Word,
        required: true
    },
    image: { type: Image },
    audio: { type: Audio },
    level: { type: Number, enum: Object.values(Level) },
    frequency: { type: Number, min: 0, max: 1 },
    definition: { type: String, required: true },
    translations: { type: [TextWithTranslation] },
    examples: { type: [TextWithTranslation] },
    createdBy: { type: Schema.Types.ObjectId }
}, {
    timestamps: true
});

Lexeme.virtual('data', {
    ref: 'Record',
    localField: '_id',
    foreignField: 'lexemeId',
    justOne: true
});

export default Lexeme;