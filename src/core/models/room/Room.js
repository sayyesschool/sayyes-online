import { Schema } from 'mongoose';

import datetime from 'shared/libs/datetime';

export const Room = new Schema({
    name: { type: String, trim: true },
    login: { type: String },
    password: { type: String },
    active: { type: Boolean, default: false }
}, {
    timestamps: true
});

Room.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'roomId'
});

Room.virtual('lessonCount', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'roomId',
    count: true
});

const GRACE_PERIOD_MIN = 10;

Room.statics.findAvailable = async function(start, end) {
    const startDate = datetime(start).utc().subtract(3, 'hours').toDate();
    const endDate = datetime(end).utc().add(GRACE_PERIOD_MIN, 'minutes').toDate();

    const rooms = await this.find({ active: true })
        .populate({
            path: 'lessons',
            select: 'date duration',
            match: {
                date: {
                    $gte: startDate,
                    $lte: endDate
                }
            }
        });

    return rooms.find(room => room.isAvailable(start, end));
};

Room.query.withLessonCountFor = function(amount = 0, unit = 'days') {
    const today = datetime().utc();
    const thirtyDaysAgo = today.clone().subtract(amount, unit);

    return this.where()
        .populate({
            path: 'lessonCount',
            match: {
                date: {
                    $gte: thirtyDaysAgo.toDate(),
                    $lt: today.toDate()
                }
            }
        });
};

Room.methods.isAvailable = function(start, end) {
    const startMoment = datetime(start).utc().add(-GRACE_PERIOD_MIN, 'minutes');
    const endMoment = datetime(end).utc().add(GRACE_PERIOD_MIN, 'minutes');

    const lessons = this.lessons.filter(lesson =>
        datetime(lesson.endAt).isAfter(startMoment, 'minutes') &&
        datetime(lesson.startAt).isBefore(endMoment, 'minutes')
    );

    return lessons.length === 0;
};

export default Room;