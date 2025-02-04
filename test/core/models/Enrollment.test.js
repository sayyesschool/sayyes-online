import expect from 'expect';
import { model } from 'mongoose';

import { EnrollmentSchema } from 'core/models/enrollment';

import datetime from 'shared/libs/datetime';

const Enrollment = model('Enrollment', EnrollmentSchema);

describe('Enrollment', () => {
    describe('scheduleLessons', () => {
        it.skip('creates correct number of lessons', () => {
            const enrollment = Enrollment.create({
                schedule: [
                    { day: 0, from: '18:00' },
                    { day: 1, from: '16:00' }
                ]
            });
            const lessons = enrollment.createLessons(5);

            expect(lessons.length).toBe(5);
        });
    });

    describe('rescheduleLessons', () => {
        it.skip('returns the correct date', () => {
            const enrollment = Enrollment.create({
                schedule: [
                    { day: 3 }
                ]
            });
            const lessons = enrollment.createLessons(5);
            const date = datetime().weekday(3).hours(10).minutes(0).seconds(0).toDate();

            const rescheduleLessons = enrollment.rescheduleLessons(lessons, date);

            expect(rescheduleLessons.length).toBe(5);
        });
    });
});