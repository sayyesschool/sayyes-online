import moment from 'moment';
import { isObjectIdOrHexString, isValidObjectId, Schema } from 'mongoose';

import { Level } from '../common/constants';
import Image from '../image';

import { LevelLabels, MeetingStatus } from './constants';
import Registration from './Registration';

export const Meeting = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    date: { type: Date },
    duration: { type: Number, default: 60 },
    capacity: { type: Number },
    level: {
        type: Number,
        min: Level.Beginner,
        max: Level.Proficient
    },
    status: {
        type: String,
        enum: Object.values(MeetingStatus),
        default: MeetingStatus.Scheduled
    },
    image: { type: Image },
    free: { type: Boolean, default: false },
    online: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    zoomId: { type: String },
    startUrl: { type: String },
    joinUrl: { type: String },
    materialsUrl: { type: String },
    notes: { type: String, trim: true, default: '' },
    hostId: { type: Schema.Types.ObjectId, ref: 'User' },
    registrations: { type: [Registration] }
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

Meeting.virtual('durationLabel').get(function() {
    return `${this.duration} минут`;
});

Meeting.virtual('levelLabel').get(function() {
    return LevelLabels[this.level] || 'Любой';
});

Meeting.virtual('isFree').get(function() {
    return this.free;
});

Meeting.virtual('isToday').get(function() {
    return moment(this.date).isSame(new Date(), 'day');
});

Meeting.virtual('isScheduled').get(function() {
    return this.status === MeetingStatus.Scheduled;
});

Meeting.virtual('isStarted').get(function() {
    return this.status === MeetingStatus.Started;
});

Meeting.virtual('isEnded').get(function() {
    return this.status === MeetingStatus.Ended;
});

Meeting.virtual('isZoom').get(function() {
    return Boolean(this.zoomId);
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

Meeting.methods.isRegistered = function($user) {
    return !!this.findRegistrationByUser($user);
};

Meeting.methods.findRegistrationById = function(id) {
    return this.registrations.find(r => r.id == id);
};

Meeting.methods.findRegistrationByUser = function($user) {
    const userId = isObjectIdOrHexString($user) ? $user : $user?.id;

    return this.registrations.find(r => r.userId == userId);
};

export default Meeting;