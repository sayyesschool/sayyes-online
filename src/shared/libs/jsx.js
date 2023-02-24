import { createElement } from 'react';

export function render(element, map) {
    if (typeof element !== 'object') return element;

    if (Array.isArray(element)) return element.map(element => render(element, map));

    const { type, props, children } = typeof map === 'function' ? map(element) : element;

    return createElement(
        type,
        props,
        ...normalizeChildren(children).map(child => render(child, map))
    );
}

function normalizeChildren(children) {
    if (!children) return [];
    if (Array.isArray(children)) return children;
    else return [children];
}