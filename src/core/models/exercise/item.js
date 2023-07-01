const { Schema } = require('mongoose');
const { randomUUID } = require('crypto');

const blockTypes = ['boolean', 'choice', 'directions', 'divider', 'essay', 'fib', 'input', 'text', 'images', 'audio', 'video'];

const Item = new Schema({
    _id: { type: Schema.Types.UUID, default: () => randomUUID() },
    type: { type: String, enum: blockTypes, required: true },
    props: { type: Object, default: undefined }
}, {
    strict: false
});

Item.virtual('exerciseId').get(function() {
    return this.parent()?.id;
});

Item.virtual('url').get(function() {
    return this.path ? `${process.env.STORAGE_URL}/${this.path}` : this.src;
});

module.exports = Item;