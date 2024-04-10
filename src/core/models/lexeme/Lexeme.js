const { Schema } = require('mongoose');

const Audio = require('../audio');
const { Level } = require('../common');
const Image = require('../image');

const { LexemeType } = require('./constants');

const Lexeme = new Schema({
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

module.exports = Lexeme;