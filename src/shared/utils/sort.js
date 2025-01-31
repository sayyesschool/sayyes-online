export function sortByDateAsc(a, b) {
    return new Date(a) - new Date(b);
}

export function sortByDateDesc(a, b) {
    return new Date(b) - new Date(a);
}