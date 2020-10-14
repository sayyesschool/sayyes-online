const { Schema } = require('mongoose');

const Video = new Schema({
    filename: String,
    title: String,
    duration: String
});

module.exports = Video;