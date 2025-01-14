import { Schema } from 'mongoose';

import datetime from 'shared/libs/datetime';

import Schedule from '../schedule';

import {
    RequestChannel,
    RequestSource,
    RequestStatus,
    RequestType,
    RequestTypeLabel
} from './constants';

export const Request = new Schema({
    hhid: { type: String },
    status: {
        type: String,
        enum: Object.values(RequestStatus),
        default: RequestStatus.New
    },
    type: {
        type: String,
        enum: Object.values(RequestType)
    },
    description: {
        type: String,
        default: ''
    },
    contact: {
        name: { type: String },
        email: {
            type: String,
            trim: true,
            maxlength: [256, 'Адрес электронный почты слишком длинный.'],
            match: [/^[a-zA-Z0-9'._%+-]+@[a-zA-Z0-9-][a-zA-Z0-9.-]*\.[a-zA-Z]{2,63}$/, 'Неверный формат адреса электронной почты.']
        },
        phone: { type: String, set: value => value.trim().replace(/[\s()\-\+]+/g, '') }
    },
    channel: {
        type: String,
        enum: Object.values(RequestChannel),
        default: RequestChannel.None
    },
    source: {
        type: String,
        enum: Object.values(RequestSource),
        default: RequestSource.None
    },
    referrer: { type: String },
    data: {
        level: { type: String, default: '' },
        purpose: { type: String, default: '' },
        experience: { type: String, default: '' },
        preferences: { type: String, default: '' }
    },
    note: { type: String, trim: true, default: '' },
    trialLessonSchedule: [Schedule],
    utm: {
        source: { type: String },
        medium: { type: String },
        campaign: { type: String },
        term: { type: String },
        content: { type: String }
    },
    recaptcha: {
        success: { type: Boolean },
        score: { type: Number }
    },
    learnerId: { type: Schema.Types.ObjectId },
    managerId: { type: Schema.Types.ObjectId },
    requestId: { type: Schema.Types.ObjectId },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    processedAt: { type: Date },
    completedAt: { type: Date },
    postponedAt: { type: Date },
    canceledAt: { type: Date }
}, {
    timestamps: true
});

Request.statics.Channel = RequestChannel;
Request.statics.Type = RequestType;
Request.statics.Source = RequestSource;
Request.statics.Status = RequestStatus;

Request.virtual('url').get(function() {
    return `requests/${this.id}`;
});

Request.virtual('typeLabel').get(function() {
    return RequestTypeLabel[this.type];
});

Request.virtual('dateString').get(function() {
    return datetime(this.createdAt).format('DD.MM.YYYY');
});

Request.virtual('timeString').get(function() {
    return datetime(this.createdAt).format('H:mm');
});

Request.virtual('dateTimeString').get(function() {
    return datetime(this.createdAt).format('D MMM H:mm');
});

Request.virtual('learner', {
    ref: 'Learner',
    localField: 'learnerId',
    foreignField: '_id',
    justOne: true
});

Request.virtual('manager', {
    ref: 'Manager',
    localField: 'managerId',
    foreignField: '_id',
    justOne: true
});

Request.pre('save', function(next) {
    console.log('Request.pre save');

    if (!this.isModified('status')) return next();

    if (this.status === RequestStatus.Processing && !this.processedAt) {
        this.processedAt = new Date();
    }

    if (this.status === RequestStatus.Completed && !this.completedAt) {
        this.completedAt = new Date();
    }

    if (this.status === RequestStatus.Postponed && !this.postponedAt) {
        this.postponedAt = new Date();
    }

    if (this.status === RequestStatus.Canceled && !this.canceledAt) {
        this.canceledAt = new Date();
    }

    next();
});

export default Request;