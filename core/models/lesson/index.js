const { Schema } = require('mongoose');
const moment = require('moment');

const Status = {
    scheduled: {
        id: 'scheduled',
        label: 'Запланировано',
        icon: 'event'
    },
    started: {
        id: 'started',
        label: 'Началось',
        icon: 'video_call'
    },
    ended: {
        id: 'ended',
        label: 'Завершилось',
        icon: 'event_available'
    },
    canceled: {
        id: 'canceled',
        label: 'Отменено',
        icon: 'event_busy'
    }
};

const Lesson = new Schema({
    date: { type: Date },
    status: { type: String, enum: Object.keys(Status), default: Status.scheduled.id },
    trial: { type: Boolean, default: false },
    duration: { type: Number, default: 60 },
    note: { type: String, trim: true, default: '' },
    teacher: { type: Schema.Types.ObjectId, ref: 'User' },
    client: { type: Schema.Types.ObjectId, ref: 'User' },
    enrollment: { type: Schema.Types.ObjectId, ref: 'Enrollment' }
}, {
    timestamps: true
});

Lesson.statics.status = Status;

Lesson.statics.findScheduled = function(id) {
    return this.find({
        date: { $gte: new Date() },
        status: 'scheduled',
        published: true
    }).sort({ date: 1 });
};

Lesson.statics.cancel = function(id) {
    return this.findByIdAndUpdate(id, { status: 'canceled' }, { new: true });
};

Lesson.virtual('title').get(function() {
    return 'Урок';
});

Lesson.virtual('url').get(function() {
    return `/lessons/${this.id}`;
});

Lesson.virtual('datetime').get(function() {
    return moment(this.date).tz('Europe/Moscow').format('dd, D MMM, H:mm МСК');
});

Lesson.virtual('statusLabel').get(function() {
    return Status[this.status]?.label;
});

Lesson.virtual('statusIcon').get(function() {
    return Status[this.status]?.icon;
});

module.exports = Lesson;