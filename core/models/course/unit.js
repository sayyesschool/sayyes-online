const { Schema } = require('mongoose');

const Unit = new Schema({
    slug: { type: String },
    title: { type: String },
    description: { type: String },
    image: { type: String },
    _lessons: [Schema.Types.ObjectId]
});

Unit.virtual('imageUrl').get(function() {
    return this.image && `https://static.sayes.ru/courses/${this.parent().slug}/images/${this.image}`;
});

module.exports = Unit;