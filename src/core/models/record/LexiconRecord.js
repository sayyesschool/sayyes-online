import { Schema } from 'mongoose';

import { Lexeme } from '../lexeme';

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
    data: {
        definition: Lexeme.path('definition').options,
        translations: Lexeme.path('translations').options,
        examples: Lexeme.path('examples').options
    }
});

Lexeme.virtual('lexeme', {
    ref: 'Lexeme',
    localField: 'lexemeId',
    foreignField: '_id'
});

export default LexiconRecord;