import { Schema } from 'mongoose';

import { Lexeme } from '../lexeme';

export const LexemeRecord = new Schema({
    learnerId: { type: Schema.Types.ObjectId, required: true },
    lexemeId: { type: Schema.Types.ObjectId, required: true },
    status: {
        type: Number,
        min: 0 /* new */,
        max: 5 /* learned */,
        default: 0
    },
    reviewDate: { type: Date, default: Date },
    data: {
        image: Lexeme.path('image').options,
        definition: Lexeme.path('definition').options,
        translation: Lexeme.path('translation').options,
        examples: Lexeme.path('examples').options
    }
});

LexemeRecord.virtual('lexeme', {
    ref: 'Lexeme',
    localField: 'lexemeId',
    foreignField: '_id',
    justOne: true
});

export default LexemeRecord;