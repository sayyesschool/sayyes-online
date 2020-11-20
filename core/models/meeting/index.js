const { Schema } = require('mongoose');
const moment = require('moment');

const Registration = require('./registration');

const Meeting = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    notes: { type: String, trim: true, default: '' },
    date: { type: Date },
    duration: { type: Number, default: 60 },
    level: { type: String, lowercase: true, enum: ['elementary', 'beginner', 'pre-intermediate', 'intermediate', 'upper-intermediate', 'advanced'], get: value => value[0].toUpperCase() + value.slice(1) },
    capacity: { type: Number },
    status: { type: String, enum: ['scheduled', 'started', 'ended', 'canceled'], default: 'scheduled' },
    free: { type: Boolean, default: false, },
    published: { type: Boolean, default: false },
    image: { type: String },
    zoomId: { type: String },
    startUrl: { type: String },
    joinUrl: { type: String },
    host: { type: Schema.Types.ObjectId, ref: 'User' },
    registrations: [Registration],
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
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

module.exports = Meeting;