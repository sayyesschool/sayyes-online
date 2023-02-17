const { Schema } = require('mongoose');
const moment = require('moment');

const Room = new Schema({
    title: { type: String, trim: true },
    login: { type: String },
    password: { type: String },
    active: { type: Boolean, default: false }
}, {
    timestamps: true
});

Room.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'room'
});

Room.virtual('lessonCount', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'room',
    count: true
});

Room.statics.findAvailable = function(from, duration) {
    const { years, months, date } = moment(from).utc().toObject();
    const startDate = new Date(Date.UTC(years, months, date));
    const endDate = new Date(Date.UTC(years, months, date + 1));

    return this.find({ active: true })
        .populate({
            path: 'lessons',
            select: 'date duration',
            match: {
                date: {
                    $gte: startDate,
                    $lt: endDate
                }
            }
        })
        .then(rooms => {
            const room = rooms.find(room => {
                return room.isAvailable(from, duration);
            });

            return room;
        });
};

Room.statics.findWithLessonCountFor = function(amount = 0, unit = 'days') {
    const today = moment().utc();
    const thirtyDaysAgo = today.clone().subtract(amount, unit);

    return this.find()
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

Room.methods.isAvailable = function(from, duration) {
    const fromMoment = moment(from).utc().add(-9, 'minutes');
    const toMoment = fromMoment.clone().add(duration + 18, 'minutes');

    const lesson = this.lessons.find(lesson => {
        return (
            moment(lesson.endAt).isSameOrAfter(fromMoment, 'minutes') &&
            moment(lesson.startAt).isSameOrBefore(toMoment, 'minutes')
        );
    });

    return !Boolean(lesson);
};

module.exports = Room;