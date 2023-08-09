export function renderToString(arg) {
    return Array.isArray(arg) ?
        arg.map(elementToString).join('') :
        elementToString(arg);
}

export function elementToString(element) {
    if (!element)
        return '';
    if (typeof element === 'string')
        return element;
    if (element.type === 'input')
        return `{${element.props.correctValues.join('|')}}` + (element.id ? `:{${element.id}}` : '');
    if (element.type === 'select')
        return `[${element.props.values.map(value => value === element.props.correctValue ? `${value}*` : value).join('|')}]` + (element.id ? `:{${element.id}}` : '');

    let result = `<${element.type}${propsToString(element.props)}`;

    if (isSelfClosingElement(element.type))
        return result + '>';
    else
        result += '>';

    if (typeof element.children === 'string')
        result += element.children;
    else if (Array.isArray(element.children))
        for (const child of element.children)
            result += elementToString(child);
    else if (typeof element.children === 'object')
        result += elementToString(element.children);

    result += `</${element.type}>`;

    return result;
}

export function propsToString(props = {}) {
    if (Object.keys(props).length === 0)
        return '';

    return Object.entries(props)
        .filter(([key, value]) => key !== 'required' && value)
        .map(([key, value]) => {
            if (key === 'className')
                key = 'class';
            else if (key === 'style' && typeof value === 'object')
                value = Object.entries(value).map(([key, value]) => `${key}: ${value}`).join('; ');
            else if (key === 'correctValues')
                key = 'data-values';

            return typeof value === 'boolean' ? key : ` ${key}="${value}"`;
        })
        .join(' ');
}

export function isSelfClosingElement(type) {
    return /^input$|^col$|^br$|^hr$|^img$/.test(type);
}