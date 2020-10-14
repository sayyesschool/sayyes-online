const { Schema } = require('mongoose');

const Audio = new Schema({
    filename: String,
    title: String,
    duration: String
});

module.exports = Audio;