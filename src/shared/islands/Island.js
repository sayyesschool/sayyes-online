import { render } from 'preact';

export default class Island {
    constructor(selector, Component) {
        this.element = document.querySelector(selector);
        this.component = Component;

        if (!this.element)
            throw new Error(`Element with selector "${selector}" not found`);
    }

    render(data) {
        const Component = this.component;
        render(<Component {...data} />, this.element);
    }

    destroy() {
        render(null, this.element);
    }
}