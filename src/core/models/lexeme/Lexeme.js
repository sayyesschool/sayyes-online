import { Schema } from 'mongoose';

import Audio from '../audio';
import { Level } from '../common';
import Image from '../image';

import { LexemeKind, LexemeType } from './constants';

export const Lexeme = new Schema({
    value: { type: String, required: true },
    definition: { type: String },
    translations: { type: [String] },
    examples: [{
        id: { type: Schema.Types.UUID },
        text: { type: String, require: true },
        translation: { type: String }
    }],
    image: { type: Image },
    audio: { type: Audio },
    type: {
        type: String,
        enum: Object.values(LexemeType),
        default: LexemeType.Word,
        required: true
    },
    kind: {
        type: String,
        enum: Object.values(LexemeKind)
    },
    level: { type: Number, enum: Object.values(Level) },
    frequency: { type: Number, min: 0, max: 1 },
    approved: { type: Boolean, default: false },
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