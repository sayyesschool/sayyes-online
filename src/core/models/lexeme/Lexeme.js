const { Schema } = require('mongoose');

const Audio = require('../audio');
const { Level } = require('../common');
const Image = require('../image');

const { LexemeType } = require('./constants');

const Lexeme = new Schema({
    type: { type: String, enum: Object.values(LexemeType), required: true },
    value: { type: String, required: true },
    image: { type: Image },
    audio: { type: Audio },
    level: { type: Level },
    frequency: { type: Number, min: 0, max: 1 },
    definitions: { type: [String] },
    translations: { type: [String] },
    examples: { type: [String] }
}, {
    timestamps: true
});

module.exports = Lexeme;