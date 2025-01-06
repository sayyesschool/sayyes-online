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
    utm: {
        source: { type: String },
        medium: { type: String },
        campaign: { type: String },
        term: { type: String },
        content: { type: String }
    },
    data: { type: Object },
    note: { type: String, trim: true, default: '' },
    learnerId: { type: Schema.Types.ObjectId },
    managerId: { type: Schema.Types.ObjectId },
    requestId: { type: Schema.Types.ObjectId },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, {
    timestamps: true
});

Request.statics.Channel = RequestChannel;
Request.statics.Source = RequestSource;
Request.statics.Status = RequestStatus;

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