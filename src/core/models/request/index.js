const { Schema } = require('mongoose');

const { statuses, statusIcons } = require('./constants');

const Request = new Schema({
    status: { type: String, enum: Object.keys(statuses), default: 'new' },
    description: { type: String, default: 'Заявка на обучение' },
    contact: {
        name: { type: String },
        phone: { type: String, set: value => value.trim().replace(/[\s()\-\+]+/g, '') }
    },
    channel: { type: String, default: '' },
    source: { type: String, default: '' },
    referrer: { type: String },
    utm: {
        source: { type: String, default: '' },
        medium: { type: String, default: '' },
        campaign: { type: String, default: '' },
        term: { type: String, default: '' },
        content: { type: String, default: '' }
    },
    note: { type: String, trim: true, default: '' },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    manager: { type: Schema.Types.ObjectId, ref: 'Manager' },
    enrollment: { type: Schema.Types.ObjectId, ref: 'Enrollment' },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, {
    timestamps: true
});

Request.virtual('url').get(function() {
    return `requests/${this.id}`;
});

Request.virtual('statusLabel').get(function() {
    return statuses[this.status];
});

Request.virtual('statusIcon').get(function() {
    return statusIcons[this.status];
});

module.exports = Request;