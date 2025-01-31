import { Schema } from 'mongoose';

import datetime, { isToday } from 'shared/libs/datetime';

import { LessonStatus, LessonType } from './constants';

export const Lesson = new Schema({
    type: { type: String, enum: Object.values(LessonType) },
    status: { type: String, enum: Object.values(LessonStatus), default: LessonStatus.Scheduled },
    date: { type: Date, set: value => datetime(value).utc().format('YYYY-MM-DDTHH:mm:ss[Z]') },
    duration: { type: Number, default: 60 },
    trial: { type: Boolean, default: false },
    free: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
    note: { type: String, trim: true, default: '' },
    enrollmentId: { type: Schema.Types.ObjectId },
    learnerId: { type: Schema.Types.ObjectId },
    teacherId: { type: Schema.Types.ObjectId },
    roomId: { type: Schema.Types.ObjectId }
}, {
    timestamps: true
});

Lesson.statics.Type = LessonType;
Lesson.statics.Status = LessonStatus;

Lesson.virtual('url').get(function() {
    return `/lessons/${this.id}`;
});

Lesson.virtual('startAt').get(function() {
    return datetime(this.date).toDate();
});

Lesson.virtual('endAt').get(function() {
    return datetime(this.date).add(this.duration, 'minutes').toDate();
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

Lesson.virtual('room', {
    ref: 'Room',
    localField: 'roomId',
    foreignField: '_id',
    justOne: true
});

Lesson.statics.findTodays = function() {
    const startDate = datetime().utc().startOf('day').toDate();
    const endDate = datetime().utc().endOf('day').toDate();

    return this.find({
        date: {
            $gte: startDate,
            $lt: endDate
        }
    }).sort({ date: 1 });
};

Lesson.statics.findScheduled = function() {
    const startOfToday = datetime().utc().startOf('day').toDate();

    return this.find({
        status: LessonStatus.Scheduled,
        date: { $gte: startOfToday }
    }).sort({ date: 1 });
};

Lesson.statics.findConflicting = async function({ date, duration, teacherId, roomId }) {
    const startMoment = datetime(date).utc();
    const endMoment = startMoment.clone().add(duration, 'minutes');
    const startDate = startMoment.clone().startOf('day').toDate();
    const endDate = endMoment.toDate();

    const lessons = await this.find({
        teacherId,
        roomId,
        date: {
            $gte: startDate,
            $lt: endDate
        }
    }).sort({ date: 1 });

    return lessons.find(lesson =>
        datetime(lesson.endAt).isAfter(startMoment, 'minutes') &&
        datetime(lesson.startAt).isBefore(endMoment, 'minutes')
    );
};

export default Lesson;