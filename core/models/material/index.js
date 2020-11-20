const { Schema } = require('mongoose');

const Material = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String },
    level: { type: String },
    published: { type: Boolean },
    image: { type: String },
    document: { type: String }
});

Material.virtual('url').get(function() {
    return `/materials/${this.slug}`;
});

Material.virtual('uri').get(function() {
    return `/materials/${this.id}`;
});

Material.virtual('imageUrl').get(function() {
    return this.image && `https://static.sayes.ru/materials/${this.slug}/${this.image}`;
});

Material.virtual('documentUrl').get(function() {
    return this.document && `https://static.sayes.ru/materials/${this.slug}/${this.document}`;
});

module.exports = Material;