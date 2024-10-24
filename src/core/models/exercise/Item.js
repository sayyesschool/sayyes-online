import { randomUUID } from 'node:crypto';

import { Schema } from 'mongoose';

const BlockType = {
    Audio: 'audio',
    Boolean: 'boolean',
    Choice: 'choice',
    Divider: 'divider',
    Essay: 'essay',
    Fib: 'fib',
    Image: 'image',
    Input: 'input',
    Text: 'text',
    Video: 'video'
};

export const Item = new Schema({
    _id: { type: Schema.Types.UUID, default: () => randomUUID() },
    type: { type: String, enum: Object.values(BlockType), required: true },
    props: { type: Object, default: {} },
    version: { type: Number, default: 1 }
}, {
    strict: false
});

Item.virtual('courseId').get(function() {
    return this.parent()?.courseId;
});

Item.virtual('exerciseId').get(function() {
    return this.parent()?.id;
});

Item.virtual('props.url').get(function() {
    return this.props && this.props.path ? `${process.env.STORAGE_URL}/${this.props.path}` : this.src;
});

export default Item;