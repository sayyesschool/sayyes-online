const { Schema } = require('mongoose');

const Exercise = new Schema({
    slug: { type: String },
    title: { type: String },
    description: { type: String },
    image: { type: String },
    audio: { type: String },
    video: { type: String }
});

Exercise.virtual('imageUrl').get(function() {
    return this.image && `https://static.sayes.ru/courses/${this.ownerDocument().slug}/images/${this.image}`;
});

Exercise.virtual('audioUrl').get(function() {
    return this.audio && `https://static.sayes.ru/courses/${this.ownerDocument().slug}/audios/${this.audio}`;
});

Exercise.virtual('videoUrl').get(function() {
    return this.video && `https://static.sayes.ru/courses/${this.ownerDocument().slug}/videos/${this.video}`;
});

module.exports = Exercise;