import isPlainObject from 'is-plain-object';

export const isMobile = (() => {
    if (typeof navigator === 'undefined' || typeof navigator.userAgent !== 'string') {
        return false;
    }

    return /Mobile/.test(navigator.userAgent);
})();

// Recursively removes any object keys with a value of undefined
export function removeUndefineds(obj) {
    if (!isPlainObject(obj)) return obj;

    const target = {};

    for (const key in obj) {
        const val = obj[key];

        if (typeof val !== 'undefined') {
            target[key] = removeUndefineds(val);
        }
    }

    return target;
}

export function formatTime(ms = 0) {
    const min = parseInt(ms / 60000);
    const sec = parseInt((ms / 1000) % 60);

    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}