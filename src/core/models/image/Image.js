import { Schema } from 'mongoose';

export const Image = new Schema({
    path: { type: String },
    src: { type: String },
    alt: { type: String },
    caption: { type: String }
});

Image.virtual('url').get(function() {
    return this.path ? `${process.env.STORAGE_URL}/${this.path}` : this.src;
});

export default Image;