import { Schema, Types } from 'mongoose';

import datetime from 'shared/libs/datetime';

import { AgeGroup, Domain, Format, Level, TeacherType } from '../common';
import Schedule from '../schedule';

import { EnrollmentStatus, EnrollmentType } from './constants';

const { ObjectId } = Types;

export const Enrollment = new Schema({
    hhid: { type: String },
    type: { type: String, enum: Object.values(EnrollmentType), default: EnrollmentType.Individual },
    status: { type: String, enum: Object.values(EnrollmentStatus), default: EnrollmentStatus.Processing },
    domain: { type: String, enum: Object.values(Domain), default: Domain.general },
    format: { type: String, default: Format.online },
    ageGroup: { type: String, default: AgeGroup.Adults },
    teacherType: { type: String, default: TeacherType.Russian },
    level: { type: Number, enum: Object.values(Level) },
    lessonDuration: { type: Number, default: 50 },
    schedule: [Schedule],
    note: { type: String, default: '' },
    learnerIds: [{ type: ObjectId }],
    teacherIds: [{ type: ObjectId }],
    managerIds: [{ type: ObjectId }],
    courseIds: [{ type: ObjectId }],
    materialIds: [{ type: ObjectId }]
}, {
    timestamps: true
});

Enrollment.virtual('url').get(function() {
    return `/enrollments/${this.id}`;
});

Enrollment.virtual('scheduleLabel').get(function() {
    return this.schedule?.map(schedule => schedule.label).join(', ');
});

Enrollment.virtual('hasLessons').get(function() {
    return this.lessons && this.lessons.length > 0;
});

Enrollment.virtual('hasCourses').get(function() {
    return this._courses && this._courses.length > 0;
});

Enrollment.virtual('hasMaterials').get(function() {
    return this._materials && this._materials.length > 0;
});

Enrollment.virtual('imageUrl').get(function() {
    if (this.domain === 'general') {
        return this.ageGroup && `${process.env.STORAGE_URL}/assets/images/enrollments/${this.domain}-${this.ageGroup}.png`;
    } else {
        return this.domain && `${process.env.STORAGE_URL}/assets/images/enrollments/${this.domain}.png`;
    }
});

Enrollment.virtual('learner', {
    ref: 'Learner',
    localField: 'learnerId',
    foreignField: '_id',
    justOne: true
});

Enrollment.virtual('teacher', {
    ref: 'Teacher',
    localField: 'teacherId',
    foreignField: '_id',
    justOne: true
});

Enrollment.virtual('manager', {
    ref: 'Manager',
    localField: 'managerId',
    foreignField: '_id',
    justOne: true
});

Enrollment.virtual('courses', {
    ref: 'Course',
    localField: 'courseIds',
    foreignField: '_id'
});

Enrollment.virtual('materials', {
    ref: 'Material',
    localField: 'materialIds',
    foreignField: '_id'
});

Enrollment.virtual('payments', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'enrollmentId',
    options: {
        sort: { createdAt: -1 }
    }
});

Enrollment.virtual('currentPayment', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'enrollmentId',
    justOne: true,
    options: {
        sort: {
            createdAt: -1
        }
    }
});

Enrollment.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'enrollmentId',
    options: {
        sort: { date: 1 }
    }
});

Enrollment.virtual('assignments', {
    ref: 'Assignment',
    localField: '_id',
    foreignField: 'enrollmentId',
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

Enrollment.methods.scheduleLessons = function(numberOfLessons, startDate = new Date()) {
    const lessons = [];
    const date = datetime(startDate);
    const schedule = this.schedule;

    for (let i = 0; i < numberOfLessons; i++) {
        const currentSchedule = schedule[i % schedule.length];
        const [hours, minutes] = currentSchedule.from?.split(':') ?? [];

        if (currentSchedule.day <= date.weekday()) {
            date.weekday(7);
        }

        const lessonDate = date
            .weekday(currentSchedule.day)
            .hours(hours)
            .minutes(minutes)
            .seconds(0)
            .toDate();

        lessons.push({
            date: lessonDate,
            duration: this.lessonDuration,
            enrollmentId: this._id,
            learnerId: this.learnerId,
            teacherId: this.teacherId
        });
    }

    return lessons;
};

Enrollment.methods.rescheduleLessons = function(lessons, startDate = new Date()) {
    return lessons
        .filter(lesson => new Date(lesson.date) > startDate)
        .map((lesson, i) => {
            const currentSchedule = this.schedule[i % this.schedule.length];
            const [hours, minutes] = currentSchedule.from?.split(':') ?? [];
            const lessonDate = datetime(lesson.date)
                .weekday(currentSchedule.day)
                .hours(hours)
                .minutes(minutes)
                .seconds(0);

            if (lessonDate.isBefore(startDate, 'day')) {
                lessonDate.weekday(7);
            }

            return {
                ...lesson,
                date: lessonDate.toDate()
            };
        });
};

export default Enrollment;