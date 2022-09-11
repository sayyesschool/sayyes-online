const { Schema } = require('mongoose');
const moment = require('moment');

const { Status, StatusLabel, StatusIcon } = require('./constants');

const Lesson = new Schema({
    type: { type: String, enum: ['online', 'offline'] },
    status: { type: String, enum: Object.values(Status), default: Status.SCHEDULED },
    date: { type: Date, set: value => moment(value).utc().format('YYYY-MM-DDTHH:mm:ss[Z]') },
    duration: { type: Number, default: 60 },
    trial: { type: Boolean, default: false },
    free: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
    note: { type: String, trim: true, default: '' },
    enrollment: { type: Schema.Types.ObjectId, ref: 'Enrollment' },
    client: { type: Schema.Types.ObjectId, ref: 'User' },
    teacher: { type: Schema.Types.ObjectId, ref: 'User' },
    room: { type: Schema.Types.ObjectId, ref: 'Room' }
}, {
    timestamps: true
});

Lesson.statics.Status = Status;
Lesson.statics.StatusIcon = StatusIcon;

Lesson.statics.findConflicting = function(teacherId, from, duration) {
    const { years, months, date } = moment(from).utc().toObject();
    const startDate = new Date(Date.UTC(years, months, date));
    const endDate = new Date(Date.UTC(years, months, date + 1));
    const fromMoment = moment(from).utc();
    const toMoment = fromMoment.clone().add(duration, 'minutes');

    return this.find({
        teacher: teacherId,
        date: {
            $gte: startDate,
            $lt: endDate
        }
    })
        .sort({ date: 1 })
        .then(lessons => {
            const lesson = lessons.find(lesson => {
                return (
                    moment(lesson.endAt).isAfter(fromMoment, 'minutes') &&
                    moment(lesson.startAt).isBefore(toMoment, 'minutes')
                );
            });

            return lesson;
        });
};

Lesson.statics.findScheduled = function() {
    return this.find({
        date: { $gte: new Date() },
        status: Status.SCHEDULED
    }).sort({ date: 1 });
};

Lesson.statics.findTodays = function() {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const from = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
    const to = new Date(Date.UTC(year, month, day + 1, 0, 0, 0, 0));

    return this.find({
        date: {
            $gte: from,
            $lt: to
        }
    }).sort({ date: 1 });
};

Lesson.virtual('url').get(function() {
    return `/lessons/${this.id}`;
});

Lesson.virtual('statusLabel').get(function() {
    return StatusLabel[this.status];
});

Lesson.virtual('statusIcon').get(function() {
    return StatusIcon[this.status];
});

Lesson.virtual('startAt').get(function() {
    return moment(this.date).toDate();
});

Lesson.virtual('endAt').get(function() {
    return moment(this.date).add(this.duration, 'minutes').toDate();
});

Lesson.virtual('dateTimeLabel').get(function() {
    return moment(this.date).format('DD.mm.YYYY в HH:mm');
});

module.exports = Lesson;