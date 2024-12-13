import { Schema } from 'mongoose';

import Audio from '../audio';
import { Level } from '../common';
import Image from '../image';

import { LexemeKind, LexemeType } from './constants';

// TODO: тут ли это должно быть?
export const LexemePublishStatus = {
    Pending: 'pending',
    Approved: 'approved',
    Unapproved: 'unapproved'
};

export const Lexeme = new Schema({
    value: { type: String, required: true, index: true },
    definition: { type: String },
    translation: { type: String },
    examples: [{
        id: { type: Schema.Types.UUID },
        text: { type: String, require: true },
        translation: { type: String }
    }],
    image: { type: Image },
    audio: { type: Audio },
    type: {
        type: String,
        enum: Object.values(LexemeType)
    },
    kind: {
        type: String,
        enum: Object.values(LexemeKind)
    },
    level: { type: Number, enum: Object.values(Level) },
    frequency: { type: Number, min: 0, max: 1 },
    publishStatus: {
        type: String,
        enum: Object.values(LexemePublishStatus),
        default: LexemePublishStatus.Pending
    },
    public: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId }
}, {
    timestamps: true
});

Lexeme.virtual('record', {
    ref: 'Record',
    localField: '_id',
    foreignField: 'lexemeId',
    justOne: true
});

Lexeme.virtual('isPending').get(function() {
    return this.publishStatus === LexemePublishStatus.Pending;
});

Lexeme.virtual('isApproved').get(function() {
    return this.publishStatus === LexemePublishStatus.Approved;
});

Lexeme.virtual('isUnapproved').get(function() {
    return this.publishStatus === LexemePublishStatus.Unapproved;
});

export default Lexeme;