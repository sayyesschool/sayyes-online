const moment = require('moment');

moment.locale('ru');

module.exports = {
    slugify,
    translitify,
    split,
    formatDate,
    formatTime,
    formatDuration,
    pluralize,
    getWordEnding,
    wordEnding,
    timeToSeconds,
    getLessonDateTimeString
};

function slugify(string = '') {
    return string.toLowerCase().trim().replace(/[^\w\s$*_+~.()!\-:@]+/g, '').replace(/[\s]+/g, '-');
}

function translitify(value = '') {
    const string = value.toLowerCase();
    let result = '';

    for (let char of string) {
        result += translit[char] || char;
    }

    return result;
}

function split(value) {
    if (typeof value !== 'string') {
        return value;
    } else {
        return value.split(',').map(value => value.trim());
    }
}

function formatDate(date, format) {
    return moment(date).format(format);
}

function formatTimeSegment(s) {
    return s > 9 ? s : `0${s}`;
}

function formatTime(hours, minutes, seconds) {
    let result = '';

    if (typeof hours === 'number') {
        result += `${formatTimeSegment(hours)}`;
    }

    if (typeof minutes === 'number') {
        result += `:${formatTimeSegment(minutes)}`;
    }

    if (typeof seconds === 'number') {
        result += `:${formatTimeSegment(seconds)}`;
    }

    return result;
}

function formatDuration(seconds = 0) {
    if (seconds === 0) return;

    const duration = moment.duration(seconds, 'seconds');
    const h = duration.hours();
    const m = duration.minutes();
    const s = duration.seconds();
    let result = '';

    if (h) {
        result += `${h}:`;
    }

    result += h ? `${m > 9 ? m : '0' + m}:` : `${m}:`;
    result += s > 9 ? s : `0${s}`;

    return result;
}

function pluralize(word, count) {
    const lastDigit = count % 10;

    if (lastDigit === 1) {
        return word;
    } else if (lastDigit > 1 && lastDigit < 5) {
        return word + 'а';
    } else {
        return word + 'ов';
    }
}

function getWordEnding(root, quantity, endings) {
    if (quantity === 1)
        return root + endings[0];
    if (quantity < 5)
        return root + endings[1];
    return root + endings[2];
}

function wordEnding(root, endings) {
    return quantity => {
        if (quantity === 1)
            return root + endings[0];
        if (quantity > 1 && quantity < 5)
            return root + endings[1];
        return root + endings[2];
    };
}

function timeToSeconds(value) {
    if (!value) return 0;
    if (Number(value) || Number(value) === 0) return value;

    let time = value.trim().split(':');
    let hours = 0, minutes = 0, seconds = 0;

    if (time.length === 2) {
        minutes = Number.parseInt(time[0]);
        seconds = Number.parseInt(time[1]);
    } else if (time.length === 3) {
        hours = Number.parseInt(time[0]);
        minutes = Number.parseInt(time[1]);
        seconds = Number.parseInt(time[2]);
    }

    return (hours * 3600) + (minutes * 60) + seconds;
}

function getLessonDateTimeString(lesson) {
    const dateString = moment(lesson.date).format('dddd, DD.MM');
    const startTime = moment(lesson.startAt).format('HH:mm');
    const endTime = moment(lesson.endAt).format('HH:mm');

    return `${dateString}, ${startTime}-${endTime}`;
}

const translit = {
    'а': 'a',
    'б': 'b',
    'в': 'v',
    'г': 'g',
    'д': 'd',
    'е': 'e',
    'ё': 'yo',
    'ж': 'zh',
    'з': 'z',
    'и': 'i',
    'й': 'j',
    'к': 'k',
    'л': 'l',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'u',
    'ф': 'f',
    'х': 'h',
    'ц': 'c',
    'ч': 'ch',
    'ш': 'sh',
    'щ': 'shh',
    'ъ': '#',
    'ы': 'y',
    'ь': '\'',
    'э': 'je',
    'ю': 'yu',
    'я': 'ya',
    ' ': '-'
};