import { Schema } from 'mongoose';

import { Lexeme } from '../lexeme';

export const LexemeRecord = new Schema({
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
        translation: Lexeme.path('translation').options,
        examples: Lexeme.path('examples').options
    }
});

export default LexemeRecord;