export function toCSV(_data, _fields) {
    if (!_data || !_data.length) return '';

    const data = _data.map(item => flattenObject(item));
    const item = data[0];
    const fields = _fields ?? Object.keys(item).filter(key => !key.startsWith('_'));
    const header = getHeader(item, fields) + '\n';

    return data.reduce((acc, item) => {
        return acc + fields.map(field => getValue(item[field])).join(',') + '\n';
    }, header);
}

function flattenObject(object, prefix = '') {
    return Object.entries(object).reduce((acc, [key, value]) => {
        if (typeof value === 'object' && value !== null) {
            return {
                ...acc,
                ...flattenObject(value, prefix + key + '.')
            };
        } else {
            return {
                ...acc,
                [prefix + key]: value
            };
        }
    }, {});
}

function getHeader(data, fields = Object.keys(data)) {
    return Object.entries(data).reduce((acc, [key, value]) => {
        if (!fields.includes(key)) {
            return acc;
        }

        if (typeof value === 'object' && value !== null) {
            return acc.concat(getHeader(value));
        } else {
            return acc.concat(key);
        }
    }, []).join(',');
}

function getValue(value) {
    if (typeof value === 'string') {
        return value;
    } else if (value instanceof Date) {
        return value.toISOString();
    } else if (Array.isArray(value)) {
        return getValue(value.map(getValue).join(', '));
    } else if (typeof value === 'object' && value !== null) {
        return getValue(Object.values(value).map(getValue).join(', '));
    } else {
        return value ?? '';
    }
}