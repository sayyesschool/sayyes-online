import moment from 'moment-timezone';

import 'moment/locale/ru';

moment.locale('ru');

export function isToday(date) {
    return moment(date).isSame(moment(), 'day');
}

export function isBeforeToday(date) {
    return moment(date).isBefore(moment(), 'day');
}

export function isThisWeek(date) {
    return moment(date).isSame(moment(), 'week');
}

export function isThisMonth(date) {
    return moment(date).isSame(moment(), 'month');
}

export function atMSK(date) {
    return moment(date).tz('Europe/Moscow');
}

export function toMSKString(date) {
    return moment(date).tz('Europe/Moscow').format('YYYY-MM-DDTHH:mm:ss');
}

export default moment;