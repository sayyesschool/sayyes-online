const { Schema } = require('mongoose');

const Unit = new Schema({
    slug: { type: String },
    title: { type: String },
    description: { type: String },
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
    return this.document && `https://static.sayes.ru${this.parent().url}/documents/${this.document}`;
});

Unit.virtual('imageUrl').get(function() {
    return this.image && `https://static.sayes.ru${this.parent().url}/images/${this.image}`;
});

module.exports = Unit;