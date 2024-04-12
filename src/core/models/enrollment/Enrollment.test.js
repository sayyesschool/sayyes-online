import moment from 'moment';

moment.locale('ru');

describe('Enrollment', () => {
    describe('createLessons', () => {
        const enrollment = {
            schedule: [{ day: 0, from: '18:00' }, { day: 1, from: '16:00' }],
            createLessons
        };

        xit('should return an array', () => {
            const lessons = enrollment.createLessons(5);

            expect(Array.isArray(lessons)).toBe(true);
        });

        it('should create correct number of lessons', () => {
            const lessons = enrollment.createLessons(5);

            expect(lessons.length).toBe(5);
        });
    });

    xdescribe('getStartDateForSchedule', () => {
        const schedule = [{ day: 3 }];

        it('should return the correct date', () => {
            const today = moment();
            const date = getStartDateForSchedule(today, schedule);

            expect(date.date()).toBe(18);
        });
    });
});

function createLessons(quantity) {
    const lessons = [];
    const date = moment();

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
        const date = moment().weekday(item.day);

        if (date.isBefore(from)) {
            continue;
        } else {
            return date;
        }
    }

    return getStartDateForSchedule(from.add(7, 'days'), schedule);
}