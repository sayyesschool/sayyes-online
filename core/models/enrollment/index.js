const { Schema } = require('mongoose');

const { Status, StatusIcon, Type, Format, Age, Domain, Level, Purpose, Plans } = require('./constants');
const DateSchedule = require('./date-schedule');
const WeekSchedule = require('./week-schedule');

const Enrollment = new Schema({
    hhid: { type: String },
    status: { type: String, default: 'processing' },
    domain: { type: String, enum: ['general', 'prep', 'business'], default: 'general' },
    type: { type: String, enum: Object.keys(Type), default: 'individual' },
    format: { type: String, enum: Object.keys(Format), default: 'online' },
    age: { type: String, enum: Object.keys(Age), default: 'adults' },
    level: { type: String, enum: Object.keys(Level), default: '' },
    experience: { type: String, default: '' },
    purpose: { type: String, enum: Object.keys(Purpose), default: '' },
    preferences: { type: String, default: '' },
    lessonDuration: { type: Number, default: 50 },
    trialLessonSchedule: [DateSchedule],
    schedule: [WeekSchedule],
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

Enrollment.virtual('imageSrc').get(function() {
    if (this.domain === 'general') {
        return `/enrollments/${this.domain}-${this.age}.png`;
    } else {
        return `/enrollments/${this.domain}.png`;
    }
});

Enrollment.virtual('numberOfScheduledLessons').get(function() {
    return (this.lessons?.filter(lesson => lesson.status === 'scheduled')?.length) || 0;
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

Enrollment.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'ref',
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