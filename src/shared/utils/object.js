export const emptyObject = Object.freeze({});

export function hasKey(object, key) {
    return !!object && key in object;
}

export function pick(object, keys = []) {
    const entries = Object.entries(object)
        .filter(([key]) => keys.includes(key));
    const map = new Map(entries);

    return toObject(map.entries());
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