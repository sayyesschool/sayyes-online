import { Schema } from 'mongoose';

import Audio from '../audio';
import { Level } from '../common';
import Image from '../image';

import { LexemeType } from './constants';

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
    definitions: { type: [String] },
    translations: { type: [String] },
    examples: { type: [String] }
}, {
    timestamps: true
});

export default Lexeme;