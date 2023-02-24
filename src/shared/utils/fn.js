export function throttle(fn, ms) {
    let timeout;
    let cache = {};

    return (...args) => {
        cache.lastArgs = args;

        if (!timeout) {
            timeout = setTimeout(() => {
                fn(...cache.lastArgs);
                clearTimeout(timeout);
                timeout = null;
            }, ms);
        }
    };
}