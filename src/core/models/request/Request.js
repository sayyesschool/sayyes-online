import moment from 'moment';
import { Schema } from 'mongoose';

import { RequestChannel, RequestSource, RequestStatus } from './constants';

export const Request = new Schema({
    status: {
        type: String,
        enum: Object.values(RequestStatus),
        default: RequestStatus.New
    },
    description: {
        type: String,
        default: 'Заявка на обучение'
    },
    contact: {
        name: { type: String },
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
    utm: {
        source: { type: String, default: '' },
        medium: { type: String, default: '' },
        campaign: { type: String, default: '' },
        term: { type: String, default: '' },
        content: { type: String, default: '' }
    },
    note: { type: String, trim: true, default: '' },
    enrollmentId: { type: Schema.Types.ObjectId },
    learnerId: { type: Schema.Types.ObjectId },
    managerId: { type: Schema.Types.ObjectId },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, {
    timestamps: true
});

Request.virtual('url').get(function() {
    return `requests/${this.id}`;
});

Request.virtual('dateString').get(function() {
    return moment(this.createdAt).format('DD.MM.YYYY');
});

Request.virtual('timeString').get(function() {
    return moment(this.createdAt).format('H:mm');
});

Request.virtual('dateTimeString').get(function() {
    return moment(this.createdAt).format('D MMM, H:mm');
});

Request.virtual('enrollment', {
    ref: 'Enrollment',
    localField: 'enrollmentId',
    foreignField: '_id',
    justOne: true
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

export default Request;