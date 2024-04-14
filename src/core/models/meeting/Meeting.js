import moment from 'moment';
import { Schema } from 'mongoose';

import Registration from './Registration';

export const Meeting = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    notes: { type: String, trim: true, default: '' },
    date: { type: Date },
    duration: { type: Number, default: 60 },
    level: { type: String, lowercase: true, enum: ['elementary', 'beginner', 'pre-intermediate', 'intermediate', 'upper-intermediate', 'advanced'], get: value => value[0].toUpperCase() + value.slice(1) },
    capacity: { type: Number },
    status: { type: String, enum: ['scheduled', 'started', 'ended', 'canceled'], default: 'scheduled' },
    free: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    image: { type: String },
    zoomId: { type: String },
    startUrl: { type: String },
    joinUrl: { type: String },
    registrations: [Registration],
    hostId: { type: Schema.Types.ObjectId },
    participantIds: [{ type: Schema.Types.ObjectId }]
}, {
    timestamps: true
});

Meeting.virtual('url').get(function() {
    return `/meetings/${this.id}`;
});

Meeting.virtual('uri').get(function() {
    return `/meetings/${this.id}`;
});

Meeting.virtual('imageUrl').get(function() {
    return this.image && `/images/meetings/${this.image}`;
});

Meeting.virtual('datetime').get(function() {
    return moment(this.date).tz('Europe/Moscow').format('dd, D MMM, H:mm МСК');
});

Meeting.virtual('hasRegistrations').get(function() {
    return this.registrations && this.registrations.length > 0;
});

Meeting.virtual('hasParticipants').get(function() {
    return this.participants && this.participants.length > 0;
});

Meeting.virtual('host', {
    ref: 'User',
    localField: 'hostId',
    foreignField: '_id',
    justOne: true
});

Meeting.virtual('participants', {
    ref: 'user',
    localField: 'participantIds',
    foreignField: '_id'
});

export default Meeting;