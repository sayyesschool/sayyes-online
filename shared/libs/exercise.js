import { createElement } from 'react';

import Input from 'shared/components/inline-input';
import Select from 'shared/components/inline-select';
import Textarea from 'shared/components/inline-textarea';

const componentsByType = {
    input: Input,
    select: Select,
    textarea: Textarea
};

const elementTypeBySymbol = {
    '{': 'input',
    '{{': 'textarea',
    '[': 'select'
};

const elementStringBySymbol = {
    '{': values => `<input data-values="${values}">`,
    '{{': values => `<textarea data-values="${values}"></textarea>`,
    '[': values => `<select>${values.map(value => `<option value="${value}">${value}</option>`).join('')}</select>`
};

export const regex = /{}|{[^{][^}]*}|{{}}|{{[^{][^}]*}}|\[\]|\[[^[][^\]]*\]/gm;

export function textToJsx(string) {
    return parseText(string);
}

export function parseText(string) {
    let result = [];
    let lastEndIndex = 0;

    for (let match of string.matchAll(regex)) {
        const prevPart = string.slice(lastEndIndex, match.index);
        const token = string.slice(match.index, match.index + match[0].length);
        const element = createJSXElement(token);

        result.push(prevPart, element);

        lastEndIndex = match.index + match[0].length;
    }

    result.push(string.slice(lastEndIndex));

    return result;
}

export function htmlToJsx(string) {
    const parser = new DOMParser();
    const html = parseHtml(string);
    const doc = parser.parseFromString(html, 'text/html');
    const div = document.createElement('div');
    div.append(...doc.body.children);
    const jsx = elementToJsx(div);
    console.log(jsx);
    return jsx;
}

export function parseHtml(string) {
    let result = '';
    let lastEndIndex = 0;

    for (let match of string.matchAll(regex)) {
        const prevPart = string.slice(lastEndIndex, match.index);
        const token = string.slice(match.index, match.index + match[0].length);
        const control = parseToken(token);

        result += prevPart + control;

        lastEndIndex = match.index + match[0].length;
    }

    result += string.slice(lastEndIndex);

    return result;
}

function elementToJsx(element) {
    const type = element.nodeName.toLowerCase();
    const props = {};

    console.log('element', element);

    if (type === '#text') {
        return element.textContent === '\n' ? undefined : element.textContent;
    } else if (type === 'input' && element.type === 'text') {
        return createElement(Input, { values: element.dataset.values.split(',') });
    } else if (type === 'textarea' && element.type === 'textarea') {
        return createElement(Textarea, { values: element.dataset.values.split(',') });
    } else if (type === 'select') {
        return createElement(Select, { values: Array.from(element.children).map(option => option.value) });
    } else if (element.childNodes.length === 0) {
        return createElement(type, props, element.textContent || undefined);
    } else {
        return createElement(type, props, ...Array.from(element.childNodes).map(child => elementToJsx(child)).filter(child => child !== undefined));
    }
}

function createJSXElement(token) {
    const type = elementTypeBySymbol[token[0]];
    const Component = componentsByType[type];
    const values = token.slice(1, -1).split('|').map(token => token.trim());

    return createElement(Component, { values });
}

function parseToken(token) {
    const typeSymbol = token[0];
    const values = token.slice(1, -1).split('|').map(token => token.trim());

    return elementStringBySymbol[typeSymbol](values);
}