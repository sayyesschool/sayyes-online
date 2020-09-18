const { Schema, model } = require('mongoose');

const RequestStatus = {
    new: 'Новая',
    processing: 'В обработке',
    completed: 'Завершена',
    canceled: 'Отменена'
};

const RequstStatusIcon = {
    new: 'new_releases',
    processing: 'edit',
    completed: 'check_circle',
    canceled: 'cancel'
};

const Request = new Schema({
    status: { type: String, enum: Object.keys(RequestStatus), default: 'new' },
    description: { type: String, default: 'Завка на обучение' },
    contact: {
        name: String,
        phone: String
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
    return RequestStatus[this.status];
});

Request.virtual('statusIcon').get(function() {
    return RequstStatusIcon[this.status];
});

module.exports = model('Request', Request);