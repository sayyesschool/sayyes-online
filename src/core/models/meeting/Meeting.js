const { Schema, model } = require('mongoose');
const moment = require('moment');

const Registration = require('../registration');

const Level = {
    Elementary: 'elementary',
    Beginner: 'beginner',
    PreIntermediate: 'pre-intermediate',
    Intermediate: 'intermediate',
    UpperIntermediate: 'upper-intermediate',
    Advanced: 'advanced'
};

const Status = {
    Scheduled: 'scheduled',
    Started: 'started',
    Ended: 'ended',
    Canceled: 'canceled'
};

const Meeting = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: { type: String, enum: Object.values(Status), default: Status.Scheduled },
    price: { type: Number, min: 0, default: 0 },
    date: { type: Date },
    duration: { type: Number, default: 60 },
    level: { type: String, lowercase: true, enum: Object.values(Level), get: value => value[0].toUpperCase() + value.slice(1) },
    capacity: { type: Number },
    published: { type: Boolean, default: false },
    zoomId: { type: String },
    startUrl: { type: String },
    joinUrl: { type: String },
    materialsUrl: { type: String },
    thumbnailUrl: { type: String },
    notes: { type: String, trim: true, default: '' },
    host: { type: Schema.Types.ObjectId, ref: 'User' },
    registrations: [Registration],
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
});

Meeting.virtual('url').get(function() {
    return `/meetings/${this.id}`;
});

Meeting.virtual('datetime').get(function() {
    return moment(this.date).tz('Europe/Moscow').format('D MMMM в H:mm МСК');
});

Meeting.virtual('dateLabel').get(function() {
    return moment(this.date).tz('Europe/Moscow').format('D MMMM YYYY');
});

Meeting.virtual('timeLabel').get(function() {
    return moment(this.date).tz('Europe/Moscow').format('H:mm МСК');
});

Meeting.virtual('free').get(function() {
    return this.price === 0;
});

Meeting.virtual('online').get(function() {
    return Boolean(this.zoomId);
});

Meeting.virtual('isToday').get(function() {
    return moment(this.date).isSame(new Date(), 'day');
});

Meeting.virtual('isScheduled').get(function() {
    return this.status === Status.Scheduled;
});

Meeting.virtual('isStarted').get(function() {
    return this.status === Status.Started;
});

Meeting.virtual('isEnded').get(function() {
    return this.status === Status.Ended;
});

Meeting.virtual('hasRegistrations').get(function() {
    return this.registrations?.length > 0;
});

Meeting.virtual('numberOfRegistrations').get(function() {
    return this.registrations?.length;
});

Meeting.virtual('numberOfApprovedRegistrations').get(function() {
    return this.registrations?.filter(r => r.status === 'approved').length;
});

Meeting.virtual('numberOfParticipants').get(function() {
    return this.registrations?.filter(r => r.participated).length;
});

Meeting.methods.canRegister = function(user) {
    return this.free || user.balance >= this.price;
};

Meeting.methods.canUnregister = function(registration) {
    if (!registration) return false;

    const meetingStartsIn = (new Date(this.date) - Date.now()) / 1000 / 60 / 60;

    return meetingStartsIn > 2;
};

Meeting.methods.isRegistered = function(user) {
    return this.registrations.includes(r => r.user == (user?.id || user));
};

Meeting.methods.getRegistrationById = function(id) {
    return this.registrations.find(r => r.id == id);
};

Meeting.methods.getRegistrationByUser = function(user) {
    return this.registrations.find(r => r.user == (user?.id || user));
};

module.exports = model('Meeting', Meeting);