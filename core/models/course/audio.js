const { Schema } = require('mongoose');

const Audio = new Schema({
    filename: String,
    title: String,
    duration: String
});

Audio.virtual('url').get(function() {
    const parent = this.parent();

    return `https://static.sayes.ru${parent ? parent.url : ''}/audios/${this.filename}`;
});

module.exports = Audio;