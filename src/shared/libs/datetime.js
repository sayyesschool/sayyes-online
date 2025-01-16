import moment from 'moment-timezone';

import 'moment/locale/ru';

moment.locale('ru');

export function isToday(date) {
    return moment(date).isSame(moment(), 'day');
}

export function isThisWeek(date) {
    return moment(date).isSame(moment(), 'week');
}

export function isThisMonth(date) {
    return moment(date).isSame(moment(), 'month');
}

export default moment;