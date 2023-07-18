// const regex = /{}|{[^{][^}]*}|{{}}|{{[^{][^}]*}}|\[\]|\[[^[][^\]]*\]:{([a-zA-Z])}/gm;
const regex = /(?:(?<type>[{\[])(?<values>[\w\d|*]*)[}\]])(?::{(?<id>[\w\d]+)})?/gm;

const ControlTypeBySymbol = {
    '{': 'input',
    '[': 'select'
};

const ControlHtmlByType = {
    input: (values, id) => `<input ${id ? `data-id="${id}" ` : ''}data-values="${values}">`,
    select: (values, id) => `<select ${id ? `data-id="${id}"` : ''}>${values.map(value => `<option value="${value}">${value}</option>`).join('')}</select>`
};

export function parseText(string) {
    const result = [];
    let lastEndIndex = 0;

    for (let match of string.matchAll(regex)) {
        const { type, values, id } = match.groups;
        const prevPart = string.slice(lastEndIndex, match.index);
        const controlData = getControlData(type, values, id);

        result.push(prevPart, controlData);

        lastEndIndex = match.index + match[0].length;
    }

    result.push(string.slice(lastEndIndex));

    return {
        type: 'p',
        children: result
    };
}

export function parseHTML(string) {
    const parser = new DOMParser();
    const html = transformPlaceholders(string);
    const doc = parser.parseFromString(html, 'text/html');

    return Array.from(doc.body.children).map(elementToObject);
}

function transformPlaceholders(string) {
    let result = '';
    let lastEndIndex = 0;

    for (let match of string.matchAll(regex)) {
        const { type, values, id } = match.groups;
        const prevPart = string.slice(lastEndIndex, match.index);
        const controlHtml = getControlHtml(type, values, id);

        result += prevPart + controlHtml;

        lastEndIndex = match.index + match[0].length;
    }

    result += string.slice(lastEndIndex);

    return result;
}

function elementToObject(element) {
    const type = element.nodeName.toLowerCase();
    const id = element.dataset?.id;
    const style = element.style?.length > 0 ?
        Object.entries(element.style).reduce((result, [key, value]) => {
            if (isNaN(key) && value) result[key] = value;
            return result;
        }, {}) : undefined;

    if (type === 'input' && element.type === 'text') {
        const correctValues = element.dataset.values?.split(',');

        return {
            type,
            props: {
                id,
                correctValues,
                required: correctValues?.length > 0
            }
        };
    } else if (type === 'select') {
        const values = Array.from(element.children).map(option => option.value);
        const correctValue = values.find(value => value.includes('*'));

        return {
            type,
            props: {
                id,
                values: values.map(value => value.replace('*', '')),
                correctValue: correctValue?.slice(0, correctValue.length - 1),
                required: values?.length > 0
            }
        };
    } else if (type === 'img') {
        return {
            type,
            props: {
                src: element.src,
                alt: element.alt
            }
        };
    } else if (type === '#text') {
        return element.textContent === '\n' ? undefined : element.textContent;
    } else if (element.childNodes.length === 0) {
        return {
            type,
            props: {
                style
            },
            children: element.textContent || undefined
        };
    } else if (element.childNodes.length === 1) {
        return {
            type,
            props: {
                style
            },
            children: elementToObject(element.childNodes[0])
        };
    } else {
        return {
            type,
            props: {
                style
            },
            children: Array.from(element.childNodes)
                .map(child => elementToObject(child))
                .filter(child => child !== undefined)
        };
    }
}

function getControlData(symbol, rawValues, id) {
    const type = ControlTypeBySymbol[symbol];
    const values = parseValues(rawValues);

    return {
        id,
        type,
        props: {
            values
        }
    };
}

function getControlHtml(symbol, rawValues, id) {
    const controlType = ControlTypeBySymbol[symbol];
    const values = parseValues(rawValues);

    return ControlHtmlByType[controlType](values, id);
}

function parseValues(rawValues) {
    return rawValues.split('|')
        .filter(value => !!value)
        .map(token => token.trim().replace(/  +/g, ' ').toLowerCase());
}