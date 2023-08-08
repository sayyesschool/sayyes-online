import { createElement } from 'react';

export function render(element, fn) {
    if (typeof element !== 'object')
        return element;

    if (Array.isArray(element))
        return element.map(element => render(element, fn));

    const { type, props, children } = fn?.(element) ?? element;

    return createElement(
        type,
        props,
        ...normalizeChildren(children).map(child => render(child, fn))
    );
}

export function traverse(element, fn) {
    if (!element) return;

    if (Array.isArray(element.children))
        for (const child of element.children)
            traverse(child, fn);

    fn?.(element);
}

function normalizeChildren(children) {
    if (!children) return [];
    if (Array.isArray(children)) return children;
    else return [children];
}