const { Schema } = require('mongoose');

const Unit = new Schema({
    slug: { type: String },
    title: { type: String },
    description: { type: String },
    content: { type: String },
    document: { type: String },
    image: { type: String },
    audios: [String],
    videos: [String],
    lessons: [Schema.Types.ObjectId]
});

Unit.virtual('uri').get(function() {
    return `${this.parent().uri}/units/${this.id}`;
});

Unit.virtual('url').get(function() {
    return `${this.parent().url}/units/${this.slug}`;
});

Unit.virtual('documentUrl').get(function() {
    return this.document && `${process.env.STATIC_URL}${this.parent().url}/documents/${this.document}`;
});

Unit.virtual('imageUrl').get(function() {
    const baseUrl = `${process.env.STATIC_URL}${this.parent().url}/images/`;

    return baseUrl + (this.image || `${this.id}.png`);
});

module.exports = Unit;