const { Schema } = require('mongoose');

const Audio = new Schema({
    path: { type: String },
    src: { type: String },
    title: { type: String },
    duration: { type: Number },
    script: { type: String }
});

Audio.virtual('url').get(function() {
    return this.path ? `${process.env.STORAGE_URL}/${this.path}` : this.src;
});

module.exports = Audio;