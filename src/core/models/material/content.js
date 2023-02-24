const { Schema } = require('mongoose');

const Content = new Schema({
    title: { type: String },
    document: { type: String }
});

Content.virtual('documentUrl').get(function() {
    return this.document && `https://static.sayes.ru${this.parent().url}/${this.document}`;
});

module.exports = Content;