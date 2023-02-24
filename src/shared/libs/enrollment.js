import moment from 'moment';

export function scheduleLessons({ schedule, quantity = 0, duration, startDate = new Date() }) {
    const lessons = [];
    const date = moment(startDate);

    for (let i = 0; i < quantity; i++) {
        const currentSchedule = schedule[i % schedule.length];
        const [hours, minutes] = currentSchedule.from?.split(':');

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
            duration
        });
    }

    return lessons;
}

export function rescheduleLessons({ schedule, lessons, startDate = new Date() }) {
    return lessons.filter(lesson => new Date(lesson.date) > startDate).map((lesson, i) => {
        const currentSchedule = schedule[i % schedule.length];
        const [hours, minutes] = currentSchedule.from?.split(':');
        const lessonDate = moment(lesson.date)
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
}