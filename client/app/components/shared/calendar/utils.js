import moment from 'moment';

const DAYS_IN_WEEK = 7;

export function getWeekData(date) {
    const result = [];

    for (let i = 0; i < DAYS_IN_WEEK; i++) {
        result[i] = date.clone().weekday(i);
    }

    return result;
}

export function getWeekLabel(date) {
    const firstDay = date.clone().weekday(0);
    const lastDay = date.clone().weekday(6);

    return `${firstDay.format('D MMMM')} — ${lastDay.format('D MMMM')} ${date.year()} г.`;
}

export function getMonthData(date) {
    const year = date.year();
    const month = date.month();
    const current = moment([year, month]);
    const daysInMonth = current.daysInMonth();
    const monthStartsOn = current.weekday();
    const numberOfWeeks = (daysInMonth + monthStartsOn) / DAYS_IN_WEEK;
    const result = [];
    let day = 1;

    for (let i = 0; i < numberOfWeeks; i++) {
        result[i] = [];

        for (let j = 0; j < DAYS_IN_WEEK; j++) {
            if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
                result[i][j] = undefined;
            } else {
                result[i][j] = moment([year, month, day++]);
            }
        }
    }

    return result;
}