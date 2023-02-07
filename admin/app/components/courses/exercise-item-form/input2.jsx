import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Button, Flex, Input, Label, MenuButton, Popover, Text } from 'shared/ui-components';
import InlineInput from 'shared/components/inline-input';
import InlineSelect from 'shared/components/inline-select';
import PlainInput from 'shared/components/plain-input';

function ExerciseInputItem({ item }, ref) {
    const [text, setText] = useState(item.text || '');
    const [elements, setElements] = useState(item.elements || []);
    const [items, setItems] = useState(item.items || []);

    useImperativeHandle(ref, () => ({
        get data() { return { text, items }; }
    }));

    const handleTextChange = useCallback(event => {
        setText(event.target.value);
    }, []);

    const handleAddElement = useCallback(type => {
        if (type === 'text') {
            setElements(elements => elements.concat({ type: 'text', content: '' }));
        } else if (type === 'input') {
            setElements(elements => elements.concat({ type: 'input', value: '' }));
        } else if (type === 'select') {
            setElements(elements => elements.concat({ type: 'select', value: '', options: [] }));
        }
    }, []);

    const handleUpdateElement = useCallback((index, data) => {
        setElements(elements => elements.map((element, i) => {
            if (index !== i) return element;

            return {
                ...element,
                ...data
            };
        }));
    }, []);

    return (
        <Flex padding="padding.medium" gap="gap.small" column>
            <Input
                value={text}
                placeholder="Текст"
                fluid
                onChange={handleTextChange}
            />

            <Flex vAlign="center" gap="gap.smaller">
                {elements.map((element, index) => {
                    if (element.type === 'text') {
                        return <PlainInput value={element.content} placeholder="Текст" onChange={event => handleUpdateElement(index, { content: event.target.value })} />;
                    } else if (element.type === 'input') {
                        return <InputElement />;
                    } else if (element.type === 'select') {
                        return <InlineSelect />;
                    }
                })}

                <MenuButton
                    trigger={
                        <Button
                            type="button"
                            icon="add"
                            flat
                            text
                        />
                    }
                    menu={[
                        {
                            content: 'Текст',
                            onClick: () => handleAddElement('text')
                        },
                        {
                            content: 'Ввод',
                            onClick: () => handleAddElement('input')
                        },
                        {
                            content: 'Выбор',
                            onClick: () => handleAddElement('select')
                        }
                    ]}
                />
            </Flex>
        </Flex>
    );
}

function InputElement({ items: _items, ...props }) {
    const [items, setItems] = useState(_items || []);

    const handleDeleteItem = useCallback(newItem => {
        setItems(items => items.filter(item => item !== newItem));
    }, []);

    const handleKeyPress = useCallback(event => {
        if (event.key == 'Enter') {
            event.preventDefault();

            const value = event.target.value;

            setItems(items => items.concat(value));

            event.target.value = '';

            return false;
        }
    }, []);

    return (
        <Popover
            trigger={<InlineInput {...props} />}
            position="below"
            align="center"
            content={
                <Flex vAlign="center" gap="gap.smaller" column>
                    <Flex>
                        {items.map(item =>
                            <Label
                                key={item}
                                content={item}
                                icon={
                                    <Button
                                        type="button"
                                        icon="delete"
                                        text
                                        onClick={() => handleDeleteItem(item)}
                                    />

                                }
                            />
                        )}
                    </Flex>

                    <input
                        defaultValue=""
                        placeholder="Введите ответ и нажмите Enter"
                        onKeyPress={handleKeyPress}
                    />
                </Flex>
            }
            pointing
        />
    );
}

export default forwardRef(ExerciseInputItem);