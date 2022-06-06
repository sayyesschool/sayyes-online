const { Schema } = require('mongoose');

const Audio = require('./audio');
const Image = require('./image');
const Video = require('./video');

const Item = new Schema({
    type: { type: String, enum: ['boolean', 'choice', 'divider', 'essay', 'fib', 'input', 'text', 'images', 'audio', 'video'] },
    title: { type: String },
    description: { type: String },
    text: { type: String },
    image: { type: Image, default: undefined },
    images: { type: [Image], default: undefined },
    audio: { type: Audio, default: undefined },
    video: { type: Video, default: undefined },
    items: { type: [Schema.Types.Mixed], default: undefined }
}, {
    strict: false
});

Item.virtual('courseId').get(function() {
    return this.ownerDocument()?.id;
});

Item.virtual('exerciseId').get(function() {
    return this.parent()?.id;
});

module.exports = Item;