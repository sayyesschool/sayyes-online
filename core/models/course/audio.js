const { Schema } = require('mongoose');

const Audio = new Schema({
    title: String,
    duration: Number,
    filename: String,
    script: String
});

Audio.virtual('url').get(function() {
    const parent = this.parent();

    return `${process.env.STATIC_URL}${parent ? parent.url : ''}/audios/${this.filename}`;
});

module.exports = Audio;