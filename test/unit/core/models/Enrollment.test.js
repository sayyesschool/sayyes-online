import expect from 'expect';

import datetime from 'shared/libs/datetime';

describe('Enrollment', () => {
    describe('createLessons', () => {
        const enrollment = {
            schedule: [{ day: 0, from: '18:00' }, { day: 1, from: '16:00' }],
            createLessons
        };

        it('should return an array', () => {
            const lessons = enrollment.createLessons(5);

            expect(Array.isArray(lessons)).toBe(true);
        });

        it('should create correct number of lessons', () => {
            const lessons = enrollment.createLessons(5);

            expect(lessons.length).toBe(5);
        });
    });

    describe('getStartDateForSchedule', () => {
        const schedule = [{ day: 3 }];

        it('should return the correct date', () => {
            const today = datetime();
            const date = getStartDateForSchedule(today, schedule);

            expect(date.date()).toBe(18);
        });
    });
});

function createLessons(quantity) {
    const lessons = [];
    const date = datetime();

    for (let i = 0; i < quantity; i++) {
        const schedule = this.schedule[i % this.schedule.length];
        const currentWeekday = date.weekday();
        const [hours, minutes] = schedule.from?.split(':') ?? [];

        if (schedule.day <= currentWeekday) {
            date.weekday(7);
        }

        lessons.push({
            date: date.weekday(schedule.day).hours(hours).minutes(minutes).seconds(0).clone()
        });
    }

    return lessons;
}

function getStartDateForSchedule(from, schedule) {
    for (const item of schedule) {
        const date = datetime().weekday(item.day);

        if (date.isBefore(from)) {
            continue;
        } else {
            return date;
        }
    }

    return getStartDateForSchedule(from.add(7, 'days'), schedule);
}