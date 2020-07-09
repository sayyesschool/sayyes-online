const mongoose = require('mongoose');

const { Schema } = mongoose;

const RequstStatus = {
    new: 'Новая',
    pending: 'В обработке',
    resolved: 'Успешная',
    rejected: 'Отказ',
    postponed: 'Отложена'
};

const LevelStatus = {
    zero: 'Нулевой',
    beg: 'Beginner',
    elem: 'Elementary',
    pre: 'Pre-Intermediate',
    int: 'Intermediate',
    upper: 'Upper-Intermediate',
    adv: 'Advanced'
};

const Request = new Schema({
    status: { type: String, enum: Object.keys(RequstStatus), default: RequstStatus.new },
    contact: {
        firstname: String,
        lastname: String,
        patronym: String,
        phone: String,
        email: String,
        dob: String,
        gender: String
    },
    study: {
        level: { type: String, enum: Object.keys(LevelStatus) },
        goal: { type: String },
        category: { type: String, enum: ['children', 'teens', 'adults'] },
        days: { type: [Number], enum: [0, 1, 2, 3, 4, 5, 6] },
        time: {
            from: Number,
            to: Number
        }
    },
    marketing: {
        channel: { type: String },
        source: { type: String },
        utm: { type: Map }
    },
    note: { type: String, trim: true, default: '' },
    lesson: { type: mongoose.Types.ObjectId, ref: 'Lesson' },
    student: { type: mongoose.Types.ObjectId, ref: 'Student' },
    managers: [{ type: mongoose.Types.ObjectId, ref: 'Manager' }],
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, {
    timestamps: true
});

Request.virtual('url').get(function() {
    return `/requests/${this.id}`;
});

Request.virtual('statusLabel').get(function() {
    return RequstStatus[this.status];
});

Request.virtual('levelLabel').get(function() {
    return LevelStatus[this.study.level];
});

module.exports = mongoose.model('Request', Request);