import { Schema } from 'mongoose';

import datetime, { isToday } from 'shared/libs/datetime';

import { Level } from '../common/constants';
import Image from '../image';

import { LevelLabels, MeetingStatus, SimpleLevelLabels } from './constants';

export const Meeting = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    startDate: {
        type: Date,
        alias: 'date',
        set: value => datetime(value).utc().toDate()
    },
    endDate: {
        type: Date,
        set: value => datetime(value).utc().toDate()
    },
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
    password: { type: String },
    materialsUrl: { type: String },
    notes: { type: String, trim: true, default: '' },
    hostId: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

Meeting.statics.Status = MeetingStatus;

Meeting.statics.getScheduled = async function() {
    return Meeting.find({
        startDate: { $gte: new Date() },
        status: 'scheduled',
        published: true
    })
        .sort({ date: 1 })
        .populate('host', 'firstname lastname image');
};

Meeting.virtual('url').get(function() {
    return `/meetings/${this.id}`;
});

Meeting.virtual('datetime').get(function() {
    return datetime(this.date).tz('Europe/Moscow').format('D MMMM в H:mm МСК');
});

Meeting.virtual('dateLabel').get(function() {
    return datetime(this.date).tz('Europe/Moscow').format('DD.MM.YYYY');
});

Meeting.virtual('timeLabel').get(function() {
    return datetime(this.date).tz('Europe/Moscow').format('H:mm МСК');
});

Meeting.virtual('duration')
    .get(function() {
        return Math.abs(datetime(this.startDate).diff(this.endDate, 'minutes'));
    })
    .set(function(value) {
        this.endDate = datetime(this.startDate).add(value, 'minutes').toDate();
    });

Meeting.virtual('durationLabel').get(function() {
    return `${this.duration} минут`;
});

Meeting.virtual('levelLabel').get(function() {
    return LevelLabels[this.level] || 'Любой';
});

Meeting.virtual('simpleLevelLabel').get(function() {
    return SimpleLevelLabels[this.level] || 'Любой';
});

Meeting.virtual('imageUrl').get(function() {
    return this.image?.url;
});

Meeting.virtual('isFree').get(function() {
    return this.free;
});

Meeting.virtual('isToday').get(function() {
    return isToday(this.startDate);
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

Meeting.virtual('isOnline').get(function() {
    return Boolean(this.online);
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
    return this.registrations?.filter(r => r.isAttended).length;
});

Meeting.virtual('host', {
    ref: 'User',
    localField: 'hostId',
    foreignField: '_id',
    justOne: true
});

Meeting.virtual('registrations', {
    ref: 'Registration',
    localField: '_id',
    foreignField: 'meetingId'
});

Meeting.methods.canUnregister = function() {
    return this.status === MeetingStatus.Scheduled && datetime().isBefore(this.date, 'hour');
};

export default Meeting;