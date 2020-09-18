const { Schema, model } = require('mongoose');
const moment = require('moment');

const Status = {
    scheduled: {
        id: 'scheduled',
        label: 'Запланирован',
        icon: 'event'
    },
    started: {
        id: 'started',
        label: 'Начался',
        icon: 'video_call'
    },
    ended: {
        id: 'ended',
        label: 'Завершился',
        icon: 'event_available'
    },
    canceled: {
        id: 'canceled',
        label: 'Отменен',
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

module.exports = model('Lesson', Lesson);