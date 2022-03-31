const { Schema } = require('mongoose');

const constants = require('./constants');
const DateSchedule = require('./date-schedule');
const WeekSchedule = require('./week-schedule');

const Enrollment = new Schema({
    hhid: { type: String },
    status: { type: String, enum: Object.keys(constants.Status), default: constants.Status.processing },
    domain: { type: String, enum: Object.keys(constants.Domain), default: constants.Domain.general },
    type: { type: String, enum: Object.keys(constants.Type), default: constants.Type.individual },
    format: { type: String, default: constants.Format.online },
    ageGroup: { type: String, default: constants.Age.adults },
    teacherType: { type: String, default: constants.TeacherType.russian },
    level: { type: String, default: '' },
    purpose: { type: String, default: '' },
    experience: { type: String, default: '' },
    preferences: { type: String, default: '' },
    lessonDuration: { type: Number, default: 50 },
    trialLessonSchedule: [DateSchedule],
    schedule: [WeekSchedule],
    note: { type: String },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
    managers: [{ type: Schema.Types.ObjectId, ref: 'Manager' }],
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    materials: [{ type: Schema.Types.ObjectId, ref: 'Material' }]
}, {
    timestamps: true
});

Enrollment.virtual('url').get(function() {
    return `/enrollments/${this.id}`;
});

Enrollment.virtual('classUrl').get(function() {
    return `/class/${this.id}`;
});

Enrollment.virtual('statusLabel').get(function() {
    return constants.StatusLabel[this.status];
});

Enrollment.virtual('statusIcon').get(function() {
    return constants.StatusIcon[this.status];
});

Enrollment.virtual('domainLabel').get(function() {
    return constants.DomainLabel[this.domain];
});

Enrollment.virtual('levelLabel').get(function() {
    return constants.LevelLabel[this.level];
});

Enrollment.virtual('typeLabel').get(function() {
    return constants.TypeLabel[this.type];
});

Enrollment.virtual('formatLabel').get(function() {
    return constants.FormatLabel[this.format];
});

Enrollment.virtual('purposeLabel').get(function() {
    return constants.PurposeLabel[this.purpose];
});

Enrollment.virtual('ageLabel').get(function() {
    return constants.AgeLabel[this.age];
});

Enrollment.virtual('teacherTypeLabel').get(function() {
    return constants.TeacherTypeLabel[this.teacherType];
});

Enrollment.virtual('scheduleLabel').get(function() {
    return this.schedule?.map(schedule => schedule.label).join(', ');
});

Enrollment.virtual('hasLessons').get(function() {
    return this.lessons?.length > 0;
});

Enrollment.virtual('imageSrc').get(function() {
    if (this.domain === 'general') {
        return `/enrollments/${this.domain}-${this.age}.png`;
    } else {
        return `/enrollments/${this.domain}.png`;
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
    foreignField: 'enrollment',
    options: {
        sort: { date: 1 }
    }
});

Enrollment.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'enrollment',
    options: {
        sort: { date: -1 }
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

Enrollment.virtual('teacher', {
    ref: 'Teacher',
    localField: 'teachers',
    foreignField: '_id',
    justOne: true
});

Enrollment.virtual('manager', {
    ref: 'Manager',
    localField: 'managers',
    foreignField: '_id',
    justOne: true
});

module.exports = Enrollment;