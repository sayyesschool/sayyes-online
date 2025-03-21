export const emptyObject = Object.freeze({});

export function isObject(arg) {
    return arg !== null && typeof arg === 'object';
}

export function isObjectEmpty(object) {
    return Object.keys(object).length === 0;
}

export function hasKey(object, key) {
    return !!object && key in object;
}

export function pick(object, keys = []) {
    const entries = Object.entries(object)
        .filter(([key]) => keys.includes(key));
    const map = new Map(entries);

    return toObject(map.entries());
}

export function stripEmptyValues(object) {
    return pick(object, Object.keys(object).filter(key => object[key] != null && object[key] !== ''));
}

export function pickValues(object, keys = []) {
    return toArray(pick(object, keys));
}

export function toObject(entries) {
    return entries.reduce((object, [key, value]) => {
        object[key] = value;

        return object;
    }, {});
}

export function toArray(object) {
    return Object.values(object);
}