import moment from 'moment';
import { Schema } from 'mongoose';

import Registration from './Registration';

const Level = {
    Any: 'any',
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

export const Meeting = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.Scheduled
    },
    price: { type: Number, min: 0, default: 0 },
    date: { type: Date },
    duration: { type: Number, default: 60 },
    level: {
        type: String,
        lowercase: true,
        enum: Object.values(Level),
        default: Level.Any
    },
    capacity: { type: Number },
    published: { type: Boolean, default: false },
    zoomId: { type: String },
    startUrl: { type: String },
    joinUrl: { type: String },
    materialsUrl: { type: String },
    thumbnailUrl: { type: String },
    notes: { type: String, trim: true, default: '' },
    registrations: { type: [Registration] },
    hostId: { type: Schema.Types.ObjectId, ref: 'User' },
    participantIds: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
});

Meeting.statics.getScheduled = async function() {
    return Meeting.find({
        date: { $gte: new Date() },
        status: 'scheduled',
        published: true
    })
        .sort({ date: 1 })
        .populate('host', 'firstname lastname avatarUrl');
};

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

Meeting.virtual('host', {
    ref: 'User',
    localField: 'hostId',
    foreignField: '_id',
    justOne: true
});

Meeting.virtual('participants', {
    ref: 'User',
    localField: 'participantIds',
    foreignField: '_id'
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

Meeting.methods.createRegistration = function(user, ticket) {

};

Meeting.methods.findRegistrationById = function(id) {
    return this.registrations.find(r => r.id == id);
};

Meeting.methods.findRegistrationByUser = function(user) {
    return this.registrations.find(r => r.userId == (user?.id || user));
};

export default Meeting;