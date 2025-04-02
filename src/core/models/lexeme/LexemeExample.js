import { Schema } from 'mongoose';

export const LexemeExample = new Schema({
    id: { type: Schema.Types.UUID },
    text: { type: String, require: true },
    translation: { type: String }
}, {
    _id: false,
    versionKey: false,
    timestamps: false
});

export default LexemeExample;