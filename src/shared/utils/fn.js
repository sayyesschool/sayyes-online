export function noop() { }

/**
 * The `debounce` function delays the execution of a function until a certain amount of time has passed since it was last called.
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - The number of milliseconds to wait before the function is called.
 * @returns {Function} - A debounced version of the input function, with a `cancel` method to cancel delayed function calls.
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
 * Throttles the execution of a function, ensuring it's not called more often than the specified delay.
 * @param {Function} fn - The function to throttle.
 * @param {number} delay - The number of milliseconds to wait before the next call.
 * @returns {Function} - A throttled version of the input function, with a `cancel` method to cancel delayed function calls.
 */
export function throttle(fn, delay = 0) {
    let timeout;
    let canceled = false;

    return function throttled(...args) {
        throttled.cancel = () => {
            clearTimeout(timeout);
            timeout = null;
            canceled = true;
        };

        if (timeout || canceled) return;

        timeout = setTimeout(() => {
            fn(...args);
            clearTimeout(timeout);
            timeout = null;
        }, delay);
    };
}

/**
 * Delays the execution of a function.
 * @param {Function} fn - The function to delay.
 * @param {number} ms - The number of milliseconds to delay the function execution.
 * @returns {Promise} - A Promise that resolves after the function has been executed.
 */
export function delay(fn, ms = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            fn();
            resolve();
        }, ms);
    });
}