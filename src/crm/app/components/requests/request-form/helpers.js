export function getOptions(data) {
    return Object.entries(data)
        .concat([['', '[Не указан]']])
        .map(([key, value]) => ({
            key: key,
            value: key,
            content: value
        }));
}