export const emptyObject = Object.freeze({});

export function hasKey(object, key) {
    return !!object && key in object; 
}