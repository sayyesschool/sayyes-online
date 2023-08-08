import { renderToString } from './render';

describe('EML renderToString', () => {
    it('for a missing argument should return an empty string', () => {
        expect(renderToString()).toBe('');
    });

    it('for a string argument should return the string', () => {
        expect(renderToString('string')).toBe('string');
    });

    describe('for input', () => {
        it('with an id should return the correct markup', () => {
            const input = {
                id: 'd0ba868e',
                type: 'input',
                props: {
                    correctValues: [
                        'i am',
                        'i\'m'
                    ],
                    required: true
                }
            };

            expect(renderToString(input)).toBe('{i am|i\'m}:{d0ba868e}');
        });

        it('without an id should return the correct markup', () => {
            const input = {
                type: 'input',
                props: {
                    correctValues: [
                        'i am',
                        'i\'m'
                    ],
                    required: true
                }
            };

            expect(renderToString(input)).toBe('{i am|i\'m}');
        });
    });

    describe('for select', () => {
        it('with an id should return the correct markup', () => {
            const select = {
                id: 'd0ba868e',
                type: 'select',
                props: {
                    values: [
                        'apple',
                        'banana',
                        'cherry'
                    ],
                    correctValue: 'apple',
                    required: true
                }
            };

            expect(renderToString(select)).toBe('[apple*|banana|cherry]:{d0ba868e}');
        });

        it('without an id should return the correct markup', () => {
            const select = {
                type: 'select',
                props: {
                    values: [
                        'apple',
                        'banana',
                        'cherry'
                    ],
                    correctValue: 'apple',
                    required: true
                }
            };

            expect(renderToString(select)).toBe('[apple*|banana|cherry]');
        });
    });

    describe('for self-closing elements', () => {
        it('without props should return the correct markup', () => {
            const image = {
                type: 'img',
                props: {}
            };

            expect(renderToString(image)).toBe('<img>');
        });

        it('with props should return the correct markup', () => {
            const image = {
                type: 'img',
                props: {
                    src: 'http://images.com/image.png',
                    alt: ''
                }
            };

            expect(renderToString(image)).toBe('<img src="http://images.com/image.png" alt="">');
        });
    });

    describe('for normal elements', () => {
        it('without props should return the correct markup', () => {
            const paragraph = {
                type: 'p',
                props: {},
                children: 'Paragraph'
            };

            expect(renderToString(paragraph)).toBe('<p>Paragraph</p>');
        });

        it('with props should return the correct markup', () => {
            const paragraph = {
                type: 'p',
                props: {
                    className: 'lead'
                },
                children: 'Paragraph'
            };

            expect(renderToString(paragraph)).toBe('<p class="lead">Paragraph</p>');
        });
    });

    describe('for nested elements', () => {
        it('without props should return the correct markup', () => {
            const list = {
                type: 'ul',
                props: {},
                children: [
                    {
                        type: 'li',
                        children: 'Foo'
                    },
                    {
                        type: 'li',
                        children: 'Bar'
                    },
                    {
                        type: 'li',
                        children: 'Baz'
                    }
                ]
            };

            expect(renderToString(list)).toBe('<ul><li>Foo</li><li>Bar</li><li>Baz</li></ul>');
        });
    });
});