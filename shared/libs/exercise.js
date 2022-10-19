const regex = /{}|{[^{][^}]*}|{{}}|{{[^{][^}]*}}|\[\]|\[[^[][^\]]*\]/gm;

const typeBySymbol = {
    '{': 'input',
    '{{': 'textarea',
    '[': 'select'
};

const htmlBySymbol = {
    '{': values => `<input data-values="${values}">`,
    '{{': values => `<textarea data-values="${values}"></textarea>`,
    '[': values => `<select>${values.map(value => `<option value="${value}">${value}</option>`).join('')}</select>`
};

export function parseText(string) {
    let result = [];
    let lastEndIndex = 0;

    for (let match of string.matchAll(regex)) {
        const prevPart = string.slice(lastEndIndex, match.index);
        const token = string.slice(match.index, match.index + match[0].length);
        const component = tokenToObject(token);

        result.push(prevPart, component);

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
        const prevPart = string.slice(lastEndIndex, match.index);
        const token = string.slice(match.index, match.index + match[0].length);
        const control = tokenToHtml(token);

        result += prevPart + control;

        lastEndIndex = match.index + match[0].length;
    }

    result += string.slice(lastEndIndex);

    return result;
}

function elementToObject(element) {
    const type = element.nodeName.toLowerCase();

    const style = element.style?.length > 0 ?
        Object.entries(element.style).reduce((result, [key, value]) => {
            if (isNaN(key) && value) result[key] = value;
            return result;
        }, {}) : undefined;

    if (type === '#text') {
        return element.textContent === '\n' ? undefined : element.textContent;
    } else if (type === 'input' && element.type === 'text') {
        const values = element.dataset.values.split(',');

        return {
            type: 'input',
            props: {
                values,
                required: values?.length > 0
            }
        };
    } else if (type === 'textarea' && element.type === 'textarea') {
        const values = element.dataset.values.split(',');

        return {
            type: 'textarea',
            props: {
                values,
                required: values?.length > 0
            }
        };
    } else if (type === 'select') {
        const values = Array.from(element.children).map(option => option.value);

        return {
            type: 'select',
            props: {
                values,
                required: values?.length > 0
            }
        };
    } else if (type === 'img') {
        return {
            type: 'img',
            props: {
                src: element.src,
                alt: element.alt
            }
        };
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
            children: Array.from(element.childNodes).map(child => elementToObject(child)).filter(child => child !== undefined)
        };
    }
}

function tokenToObject(token) {
    const type = typeBySymbol[token[0]];
    const values = parseValues(token);

    return {
        type,
        props: {
            values
        }
    };
}

function tokenToHtml(token) {
    const typeSymbol = token[0];
    const values = parseValues(token);

    return htmlBySymbol[typeSymbol](values);
}

function parseValues(token) {
    return token.slice(1, -1).split('|').map(token => token.trim());
}