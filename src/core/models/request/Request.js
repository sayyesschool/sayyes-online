import { Schema } from 'mongoose';

import datetime from 'shared/libs/datetime';

import { Customer, UTM } from '../common';

import { RequestStatus } from './constants';

export const Request = new Schema({
    hhid: { type: String },
    status: {
        type: String,
        enum: Object.values(RequestStatus),
        default: RequestStatus.New
    },
    type: { type: String },
    channel: { type: String },
    source: { type: String },
    contact: { type: Customer },
    note: { type: String, trim: true, default: '' },
    referrer: { type: String },
    captcha: { type: Boolean, default: false },
    data: { type: Object, default: {} },
    utm: { type: UTM },
    learnerId: { type: Schema.Types.ObjectId },
    managerId: { type: Schema.Types.ObjectId },
    paymentId: { type: Schema.Types.ObjectId },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    processedAt: { type: Date },
    completedAt: { type: Date },
    postponedAt: { type: Date },
    canceledAt: { type: Date }
}, {
    timestamps: true
});

Request.statics.Status = RequestStatus;

Request.virtual('url').get(function() {
    return `requests/${this.id}`;
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

Request.virtual('hasUTM').get(function() {
    return this.utm && Object.values(this.utm).filter(Boolean).length > 0;
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