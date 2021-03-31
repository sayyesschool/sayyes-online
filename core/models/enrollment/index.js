const { Schema } = require('mongoose');

const { Status, StatusIcon, Type, Format, Age, Domain, Level, Purpose, Plans } = require('./constants');
const Schedule = require('./schedule');

const Enrollment = new Schema({
    status: { type: String, default: 'processing' },
    domain: { type: String, enum: ['general', 'prep', 'business'], default: 'general' },
    type: { type: String, enum: Object.keys(Type), default: 'individual' },
    format: { type: String, enum: Object.keys(Format), default: 'online' },
    age: { type: String, enum: Object.keys(Age), default: 'adults' },
    level: { type: String, enum: Object.keys(Level), default: '' },
    experience: { type: String, default: '' },
    purpose: { type: String, enum: Object.keys(Purpose), default: '' },
    preferences: { type: String, default: '' },
    trialLesson: [{
        date: String,
        from: String,
        to: String
    }],
    schedule: [Schedule],
    note: { type: String },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', set: value => value || null },
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

Enrollment.virtual('purposeLabel').get(function() {
    return Purpose[this.purpose];
});

Enrollment.virtual('ageLabel').get(function() {
    return Age[this.age];
});

Enrollment.virtual('scheduleLabel').get(function() {
    return this.schedule?.map(schedule => schedule.label).join(', ');
});

// Enrollment.virtual('packs').get(function() {
//     const plan = Plans[this.age]?.[this.domain];
//     const packs = plan?.packs;

//     return Object.entries(packs).map(([key, value]) => ({
//         price: value,
//         numberOfLessons: key,
//         basePricePerLesson: plan.basePricePerLesson,
//         pricePerLesson: Math.round(value / key)
//     }));
// });

Enrollment.virtual('imageSrc').get(function() {
    if (this.domain === 'general') {
        return `/enrollments/${this.domain}-${this.age}.png`;
    } else {
        return `/enrollments/${this.domain}.png`;
    }
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
    // match: {
    //     status: 'pending'
    // },
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

Enrollment.methods.getPrice = function(numberOfLessons) {
    return Plans[this.age][this.domain].packs[numberOfLessons];
};

Enrollment.methods.createLessons = function(quantity) {
    return new Array(quantity).fill().map(() => ({
        duration: this.lessonDuration,
        enrollment: this.id,
        client: this.client,
        teacher: this.teacher
    }));
};

module.exports = Enrollment;