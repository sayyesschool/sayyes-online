const { Schema } = require('mongoose');

const Image = new Schema({
    path: { type: String },
    src: { type: String },
    alt: { type: String },
    caption: { type: String }
});

Image.virtual('url').get(function() {
    return this.path ? `${process.env.STORAGE_URL}/${this.path}` : this.src;
});

module.exports = Image;