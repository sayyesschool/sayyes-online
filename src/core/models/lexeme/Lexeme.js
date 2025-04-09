import { Schema } from 'mongoose';

import Audio from '../audio';
import { Level } from '../common';
import Image from '../image';

import { LexemeKind, LexemePublishStatus, LexemeType } from './constants';
import LexemeExample from './LexemeExample';

export const Lexeme = new Schema({
    value: { type: String, required: true, index: true },
    definition: { type: String },
    translation: { type: String },
    examples: [LexemeExample],
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
    createdBy: { type: Schema.Types.ObjectId }
}, {
    timestamps: true
});

Lexeme.statics.Type = LexemeType;
Lexeme.statics.Kind = LexemeKind;
Lexeme.statics.Status = LexemePublishStatus;

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

Lexeme.virtual('isArchived').get(function() {
    return this.publishStatus === LexemePublishStatus.Archived;
});

export default Lexeme;