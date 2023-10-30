const { Schema } = require('mongoose');
const moment = require('moment');

const { LessonType, LessonStatus } = require('./constants');

const Lesson = new Schema({
    type: { type: String, enum: Object.values(LessonType) },
    status: { type: String, enum: Object.values(LessonStatus), default: LessonStatus.Scheduled },
    date: { type: Date, set: value => moment(value).utc().format('YYYY-MM-DDTHH:mm:ss[Z]') },
    duration: { type: Number, default: 60 },
    trial: { type: Boolean, default: false },
    free: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
    note: { type: String, trim: true, default: '' },
    enrollmentId: { type: Schema.Types.ObjectId, required: true },
    learnerId: { type: Schema.Types.ObjectId },
    teacherId: { type: Schema.Types.ObjectId },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room' }
}, {
    timestamps: true
});

Lesson.statics.Type = LessonType;
Lesson.statics.Status = LessonStatus;

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
    }).sort({ date: 1 })
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
        status: LessonStatus.Scheduled
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

Lesson.virtual('startAt').get(function() {
    return moment(this.date).toDate();
});

Lesson.virtual('endAt').get(function() {
    return moment(this.date).add(this.duration, 'minutes').toDate();
});

Lesson.virtual('dateString').get(function() {
    return moment(this.date).format('DD.MM.YYYY');
});

Lesson.virtual('timeString').get(function() {
    return moment(this.date).format('HH:mm');
});

Lesson.virtual('dateTimeString').get(function() {
    return moment(this.date).format('DD.MM.YYYY, HH:mm');
});

Lesson.virtual('enrollment', {
    ref: 'Enrollment',
    localField: 'enrollmentId',
    foreignField: '_id',
    justOne: true
});

Lesson.virtual('learner', {
    ref: 'Learner',
    localField: 'learnerId',
    foreignField: '_id',
    justOne: true
});

Lesson.virtual('teacher', {
    ref: 'Teacher',
    localField: 'teacherId',
    foreignField: '_id',
    justOne: true
});

module.exports = Lesson;