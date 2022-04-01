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