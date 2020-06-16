const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const Lesson = new Schema({
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    date: { type: Date },
    duration: { type: Number, default: 60 },
    status: { type: String, enum: ['scheduled', 'started', 'ended', 'canceled'], default: 'scheduled' },
    notes: { type: String, trim: true, default: '' }
}, {
    timestamps: true
});

Lesson.virtual('url').get(function() {
    return `/lessons/${this.id}`;
});

Lesson.virtual('datetime').get(function() {
    return moment(this.date).tz('Europe/Moscow').format('dd, D MMM, H:mm МСК');
});

module.exports = mongoose.model('Lesson', Lesson);