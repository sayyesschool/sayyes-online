import { Schema } from 'mongoose';

export const LexiconRecord = new Schema({
    learnerId: { type: Schema.Types.ObjectId, required: true },
    lexemeId: { type: Schema.Types.ObjectId, required: true },
    status: {
        type: Number,
        min: 0 /* new */,
        max: 4 /* learned */,
        default: 0
    },
    reviewDate: { type: Date, default: Date },
    definition: { type: String },
    translations: { type: [String] },
    examples: [{
        id: { type: Schema.Types.UUID },
        text: { type: String, require: true },
        translation: { type: String }
    }]
});

export default LexiconRecord;