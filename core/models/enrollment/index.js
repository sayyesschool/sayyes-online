const { Schema } = require('mongoose');

const Schedule = require('./schedule');

const Status = {
    pending: 'В обработке',
    trial: 'Пробный урок',
    active: 'Активное',
    postponed: 'Отложено',
    canceled: 'Отменено',
    completed: 'Завершено'
};

const StatusIcon = {
    pending: 'pending',
    trial: 'event_available',
    active: 'school',
    postponed: 'next_plan',
    canceled: 'cancel',
    completed: 'check_circle'
};

const Type = {
    individual: 'Индивидуально',
    group: 'В группе'
};

const Format = {
    online: 'Онлайн',
    offline: 'Оффлайн'
};

const Age = {
    adult: 'Взрослые',
    teenager: 'Подростки',
    child: 'Дети'
};

const Level = {
    zero: 'Нулевой',
    beg: 'Beginner',
    elem: 'Elementary',
    pre: 'Pre-Intermediate',
    int: 'Intermediate',
    upper: 'Upper-Intermediate',
    adv: 'Advanced'
};

const Enrollment = new Schema({
    status: { type: String, default: 'pending' },
    type: { type: String, enum: Object.keys(Type), default: 'individual' },
    format: { type: String, enum: Object.keys(Format), default: 'online' },
    age: { type: String, enum: Object.keys(Age), default: 'adult' },
    level: { type: String, enum: Object.keys(Level) },
    goal: { type: String, default: '' },
    domain: { type: String, enum: ['general', 'speaking', 'business'], default: 'general' },
    native: { type: Boolean, default: false },
    schedules: [Schedule],
    pricePerLesson: { type: Number },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    clients: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    manager: { type: Schema.Types.ObjectId, ref: 'Manager' },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    materials: [{ type: Schema.Types.ObjectId, ref: 'Material' }],
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, {
    timestamps: true
});

Enrollment.virtual('title').get(function() {
    return `${this.typeLabel} ${this.formatLabel}`;
});

Enrollment.virtual('url').get(function() {
    return `/enrollments/${this.id}`;
});

Enrollment.virtual('classUrl').get(function() {
    return `/class/${this.id}`;
});

Enrollment.virtual('isActive').get(function() {
    return this.status === 'active';
});

Enrollment.virtual('statusLabel').get(function() {
    return Status[this.status];
});

Enrollment.virtual('statusIcon').get(function() {
    return StatusIcon[this.status];
});

Enrollment.virtual('levelLabel').get(function() {
    return Level[this.level];
});

Enrollment.virtual('typeLabel').get(function() {
    return Type[this.type];
});

Enrollment.virtual('formatLabel').get(function() {
    return Format[this.format];
});

Enrollment.virtual('ageLabel').get(function() {
    return Age[this.age];
});

Enrollment.virtual('schedule').get(function() {
    return this.schedules.map(schedule => schedule.label).join(', ');
});

Enrollment.virtual('hasPayments').get(function() {
    return (this.payments && this.payments.length) ? true : false;
});

Enrollment.virtual('hasUnresolvedPayments').get(function() {
    return this.payments && this.payments.some(payment => !payment.isResolved);
});

Enrollment.virtual('amountPaid').get(function() {
    return (this.hasPayments && this.payments.filter(payment => payment.paid).reduce((total, payment) => total + payment.amount || 0, 0)) || 0;
});

Enrollment.virtual('amountToPay').get(function() {
    return this.amountPaid <= this.price ? this.price - this.amountPaid : 0;
});

Enrollment.virtual('isPaid').get(function() {
    return this.amountPaid >= this.price;
});

Enrollment.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'enrollment'
});

Enrollment.virtual('assignments', {
    ref: 'Assignment',
    localField: '_id',
    foreignField: 'enrollment',
    options: {
        sort: { createdAt: -1 }
    }
});

Enrollment.virtual('payments', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'enrollment',
    options: {
        sort: { createdAt: -1 }
    }
});

Enrollment.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'enrollment',
    options: {
        sort: { createdAt: -1 }
    }
});

module.exports = Enrollment;