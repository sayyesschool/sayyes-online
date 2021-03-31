const moment = require('moment');

moment.locale('ru');

function createLessons(quantity) {
    const lessons = [];
    let prevLesson = { date: getStartDateForSchedule(moment(), schedule) };

    for (let i = 0; i < quantity; i++) {
        const schedule = this.schedule[i % this.schedule.length];
        const diff = moment(prevLesson.date).weekday(schedule.day);

        const nextLesson = {
            date: moment(prevLesson.date).weekday(schedule.day),
            enrollment: this.id,
            client: this.client,
            teacher: this.teacher
        };

        lessons.push(nextLesson);

        prevLesson = nextLesson;
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

describe('Enrollment', () => {
    xdescribe('createLessons', () => {
        const enrollment = {
            id: '123',
            schedule: [{ day: 0 }, { day: 3 }],
            client: 'client',
            teacher: 'teacher',
            createLessons
        };

        it('should return an array', () => {
            const lessons = enrollment.createLessons(5);

            expect(Array.isArray(lessons)).toBe(true);
        });

        it('should create correct number of lessons', () => {
            const lessons = enrollment.createLessons(5);
            console.log(lessons);
            expect(lessons.length).toBe(5);
        });
    });

    describe('getStartDateForSchedule', () => {
        const schedule = [{ day: 3 }];

        it('should return the correct date', () => {
            const today = moment();
            const date = getStartDateForSchedule(today, schedule);

            expect(date.date()).toBe(18);
        });
    });
});