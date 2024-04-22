import { Schema } from 'mongoose';

export const Record = new Schema({
    type: { type: String, enum: ['lexicon'] }
}, {
    discriminatorKey: 'type',
    timestamps: true
});

export default Record;