/**
 * Groups sequential function calls into one.
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(fn, delay = 0) {
    let timeout;

    return function debounced(...args) {
        debounced.cancel = () => clearTimeout(timeout);

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

/**
 * Delays executing a function.
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function throttle(fn, delay = 0) {
    let timeout;
    let cache = {};
    let canceled = false;

    return function throttled(...args) {
        throttled.cancel = () => {
            clearTimeout(timeout);
            timeout = null;
            canceled = true;
        };

        cache.lastArgs = args;

        if (timeout || canceled) return;

        timeout = setTimeout(() => {
            fn(...cache.lastArgs);
            clearTimeout(timeout);
            timeout = null;
        }, delay);
    };
}

export function delay(fn, ms = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            fn();
            resolve();
        }, ms);
    });
}