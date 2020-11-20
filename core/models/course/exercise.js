const { Schema } = require('mongoose');

const Exercise = new Schema({
    slug: { type: String },
    title: { type: String },
    description: { type: String },
    image: { type: String },
    audio: { type: String },
    video: { type: String },
    _unit: { type: Schema.Types.ObjectId },
    _lesson: { type: Schema.Types.ObjectId }
});

Exercise.virtual('imageUrl').get(function() {
    return `https://static.sayes.ru${this.ownerDocument()?.uri}/images/${this.image}`;
});

Exercise.virtual('audioUrl').get(function() {
    return this.audio && `https://static.sayes.ru${this.ownerDocument()?.uri}/audios/${this.audio}`;
});

Exercise.virtual('videoUrl').get(function() {
    return this.video && `https://static.sayes.ru${this.ownerDocument()?.uri}/videos/${this.video}`;
});

module.exports = Exercise;