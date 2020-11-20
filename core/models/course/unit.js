const { Schema } = require('mongoose');

const Unit = new Schema({
    slug: { type: String },
    title: { type: String },
    description: { type: String },
    document: { type: String },
    image: { type: String },
    _audios: [String],
    _videos: [String],
    _lessons: [Schema.Types.ObjectId]
});

Unit.virtual('documentUrl').get(function() {
    return this.document && `https://static.sayes.ru${this.parent().url}/documents/${this.document}`;
});

Unit.virtual('imageUrl').get(function() {
    return this.image && `https://static.sayes.ru${this.parent().url}/images/${this.image}`;
});

module.exports = Unit;