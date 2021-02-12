const { Schema } = require('mongoose');

const Schedule = require('./schedule');

const Status = {
    processing: 'В обработке',
    trial: 'Пробный урок',
    payment: 'Оплата',
    active: 'Активное',
    postponed: 'Отложено',
    canceled: 'Отменено',
    completed: 'Завершено'
};

const StatusIcon = {
    processing: 'pending',
    trial: 'event_available',
    payment: 'payment',
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
    adults: 'Взрослые',
    teenagers: 'Подростки',
    children: 'Дети'
};

const Domain = {
    general: 'Общий разговорный курс',
    speaking: 'Разговорный курс',
    business: 'Бизнес курс'
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

const Goal = {
    work: 'Для работы',
    study: 'Для учебы',
    interview: 'Для собеседования',
    travel: 'Для путешествий',
    hobby: 'Для себя (хобби)'
};

const Plans = {
    children: {
        general: {
            id: 'general',
            title: 'Общий разговорный курс',
            subtitle: '50 минут',
            basePricePerLesson: 1300,
            packs: {
                '4': 4150,
                '8': 7600,
                '16': 14100,
                '32': 26100
            }
        }
    }
};

const Enrollment = new Schema({
    status: { type: String, default: 'processing' },
    domain: { type: String, enum: ['general', 'speaking', 'business'], default: 'general' },
    type: { type: String, enum: Object.keys(Type), default: 'individual' },
    format: { type: String, enum: Object.keys(Format), default: 'online' },
    age: { type: String, enum: Object.keys(Age), default: 'adults' },
    level: { type: String, enum: Object.keys(Level), default: '' },
    goal: { type: String, enum: Object.keys(Goal), default: '' },
    native: { type: Boolean, default: false },
    schedule: [Schedule],
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    clients: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    manager: { type: Schema.Types.ObjectId, ref: 'Manager' },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    materials: [{ type: Schema.Types.ObjectId, ref: 'Material' }]
}, {
    timestamps: true
});

Enrollment.virtual('title').get(function() {
    return `${this.domainLabel}`;
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

Enrollment.virtual('domainLabel').get(function() {
    return Domain[this.domain];
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

Enrollment.virtual('goalLabel').get(function() {
    return Goal[this.goal];
});

Enrollment.virtual('ageLabel').get(function() {
    return Age[this.age];
});

Enrollment.virtual('scheduleLabel').get(function() {
    return this.schedules?.map(schedule => schedule.label).join(', ');
});

Enrollment.virtual('packs').get(function() {
    const plan = Plans[this.age]?.[this.domain];
    const packs = plan?.packs;

    return Object.entries(packs).map(([key, value]) => ({
        price: value,
        numberOfLessons: key,
        basePricePerLesson: plan.basePricePerLesson,
        pricePerLesson: Math.round(value / key)
    }));
});

Enrollment.virtual('numberOfScheduledLessons').get(function() {
    return (this.lessons?.filter(lesson => lesson.status === 'scheduled')) || 0;
});

Enrollment.virtual('hasPayments').get(function() {
    return this.payments?.length > 0 ? true : false;
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

Enrollment.virtual('payments', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'enrollment',
    options: {
        sort: { createdAt: -1 }
    }
});

Enrollment.virtual('currentPayment', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'enrollment',
    justOne: true,
    match: {
        status: 'pending'
    },
    options: {
        sort: {
            createdAt: -1
        }
    }
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

Enrollment.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'enrollment',
    options: {
        sort: { createdAt: -1 }
    }
});

Enrollment.methods.createLessons = function(quantity) {
    return new Array(quantity).fill({
        enrollment: this.id,
        client: this.client,
        teacher: this.teacher
    });
};

Enrollment.methods.getPrice = function(numberOfLessons) {
    return Plans[this.age][this.domain].packs[numberOfLessons];
};

module.exports = Enrollment;