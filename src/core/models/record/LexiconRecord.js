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
    reviewDate: { type: Date, default: Date }
});

export default LexiconRecord;