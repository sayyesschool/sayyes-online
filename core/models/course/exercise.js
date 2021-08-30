const { Schema } = require('mongoose');

const Item = new Schema({}, {
    strict: false
});

const Exercise = new Schema({
    type: { type: String },
    title: { type: String },
    description: { type: String },
    text: { type: String },
    image: { type: String },
    audio: { type: String },
    video: { type: String },
    items: [Item],
    unit: { type: Schema.Types.ObjectId },
    lesson: { type: Schema.Types.ObjectId }
});

Exercise.virtual('uri').get(function() {
    return `${this.parent().uri}/units/${this.unit}/lessons/${this.lesson}/exercises/${this.id}`;
});

Exercise.virtual('url').get(function() {
    return this.uri;
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