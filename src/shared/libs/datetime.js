import moment from 'moment-timezone';

import 'moment/locale/ru';

moment.locale('ru');

export function isToday(date) {
    return moment(date).isSame(moment(), 'day');
}

export default moment;