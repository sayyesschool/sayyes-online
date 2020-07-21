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

const Contact = new Schema({
    firstname: String,
    lastname: String,
    patronym: String,
    phone: String,
    email: String,
    gender: String,
    dob: Date
}, {
    _id: false
});

const Request = new Schema({
    status: { type: String, enum: Object.keys(RequstStatus), default: RequstStatus.new },
    contact: { type: Contact, default: undefined },
    study: {
        age: { type: String, enum: ['child', 'teenager', 'adult'], default: '' },
        level: { type: String, enum: Object.keys(LevelStatus), default: '' },
        goal: { type: String, default: '' },
        domain: { type: String, enum: ['general', 'speaking', 'business'], default: '' },
        teacher: { type: String, enum: ['russian', 'english'], default: '' },
        schedule: [{
            days: { type: [Number], enum: [0, 1, 2, 3, 4, 5, 6] },
            from: { type: Number, min: 0, max: 23 },
            to: { type: Number, min: 0, max: 23 }
        }]
    },
    marketing: {
        channel: { type: String },
        source: { type: String },
        utm: { type: Map }
    },
    note: { type: String, trim: true, default: '' },
    lesson: { type: mongoose.Types.ObjectId, ref: 'Lesson' },
    client: { type: mongoose.Types.ObjectId, ref: 'User' },
    managers: [{ type: mongoose.Types.ObjectId, ref: 'Manager' }],
    contactAt: { type: Date },
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