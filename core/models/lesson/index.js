const { Schema } = require('mongoose');
const moment = require('moment');

const { Status, StatusLabel, StatusIcon } = require('./constants');

const Lesson = new Schema({
    status: { type: String, enum: Object.keys(Status), default: Status.scheduled },
    date: { type: Date },
    duration: { type: Number, default: 60 },
    trial: { type: Boolean, default: false },
    free: { type: Boolean, default: false },
    note: { type: String, trim: true, default: '' },
    teacher: { type: Schema.Types.ObjectId, ref: 'User' },
    client: { type: Schema.Types.ObjectId, ref: 'User' },
    enrollment: { type: Schema.Types.ObjectId, ref: 'Enrollment' }
}, {
    timestamps: true
});

Lesson.statics.Status = Status;
Lesson.statics.StatusIcon = StatusIcon;

Lesson.statics.findScheduled = function() {
    return this.find({
        date: { $gte: new Date() },
        status: 'scheduled',
        published: true
    }).sort({ date: 1 });
};

Lesson.virtual('url').get(function() {
    return `/lessons/${this.id}`;
});

Lesson.virtual('dateLabel').get(function() {
    return moment(this.date).tz('Europe/Moscow').format('D MMM, dd');
});

Lesson.virtual('shortDateLabel').get(function() {
    return moment(this.date).tz('Europe/Moscow').format('D.M');
});

Lesson.virtual('timeLabel').get(function() {
    return moment(this.date).tz('Europe/Moscow').format('H:mm');
});

Lesson.virtual('weekdayLabel').get(function() {
    return moment(this.date).tz('Europe/Moscow').format('dd');
});

Lesson.virtual('durationLabel').get(function() {
    return `${this.duration} мин.`;
});

Lesson.virtual('statusLabel').get(function() {
    return StatusLabel[this.status];
});

Lesson.virtual('statusIcon').get(function() {
    return StatusIcon[this.status];
});

module.exports = Lesson;