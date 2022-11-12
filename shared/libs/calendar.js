import moment from 'moment';

const DAYS_IN_WEEK = 7;

export function getEventsByDate(events = []) {
    return events.reduce((map, event) => {
        const key = new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate()).valueOf();

        if (map.has(key)) {
            map.get(key)?.push(event);
        } else {
            map.set(key, [event]);
        }

        return map;
    }, new Map());
}

export function getEventsByHour(events = []) {
    return events.reduce((map, event) => {
        const key = event.date.getHours();

        if (map.has(key)) {
            map.get(key)?.push(event);
        } else {
            map.set(key, [event]);
        }

        return map;
    }, new Map());
}

export function getWeekData(date, events) {
    const today = new Date();
    const eventsByDate = getEventsByDate(events);
    const weekData = [];

    for (let i = 0; i < DAYS_IN_WEEK; i++) {
        const data = {};
        const dayDate = date.clone().weekday(i).hours(0).minutes(0).seconds(0).milliseconds(0);

        data.date = dayDate;
        data.weekday = dayDate.weekday();
        data.isToday = dayDate.isSame(today, 'date');
        data.label = `${dayDate.format('dd')}, ${dayDate.date()}`;
        data.eventsByHour = getEventsByHour(eventsByDate.get(dayDate.valueOf()));

        weekData[i] = data;
    }

    return weekData;
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