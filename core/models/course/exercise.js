const { Schema } = require('mongoose');

const Exercise = new Schema({
    slug: { type: String },
    title: { type: String },
    description: { type: String },
    image: { type: String },
    audio: { type: String },
    video: { type: String },
    unit: { type: Schema.Types.ObjectId },
    lesson: { type: Schema.Types.ObjectId }
});

Exercise.virtual('imageUrl').get(function() {
    return `${process.env.STATIC_URL}${this.ownerDocument()?.uri}/images/${this.image}`;
});

Exercise.virtual('audioUrl').get(function() {
    return this.audio && `${process.env.STATIC_URL}${this.ownerDocument()?.uri}/audios/${this.audio}`;
});

Exercise.virtual('videoUrl').get(function() {
    return this.video && `${process.env.STATIC_URL}${this.ownerDocument()?.uri}/videos/${this.video}`;
});

module.exports = Exercise;