import { Schema } from 'mongoose';

export const UTM = new Schema({
    source: { type: String },
    medium: { type: String },
    campaign: { type: String },
    term: { type: String },
    content: { type: String }
}, {
    _id: false,
    id: false,
    strict: false,
    timestamps: false
});

export default UTM;