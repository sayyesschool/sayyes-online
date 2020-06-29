const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const RequstStatus = {
    new: 'Новая',
    pending: 'В обработке',
    resolved: 'Успешная',
    rejected: 'Отказ',
    postponed: 'Отложена'
};

const Request = new Schema({
    contact: {
        name: String,
        phone: String,
        email: String
    },
    status: { type: String, enum: Object.keys(RequstStatus), default: RequstStatus.new },
    channel: { type: String },
    source: { type: String },
    purpose: { type: String },
    category: { type: String, enum: ['adult', 'child'] },
    manager: { type: mongoose.Types.ObjectId, ref: 'Manager' },
    student: { type: mongoose.Types.ObjectId, ref: 'Student' },
    meta: { type: Map },
    note: { type: String, trim: true, default: '' }
}, {
    timestamps: true
});

Request.virtual('url').get(function() {
    return `/requests/${this.id}`;
});

Request.virtual('datetime').get(function() {
    return moment(this.createdAt).tz('Europe/Moscow').format('dd, D MMM, H:mm МСК');
});

Request.virtual('statusLabel').get(function() {
    return RequstStatus[this.status];
});

module.exports = mongoose.model('Request', Request);