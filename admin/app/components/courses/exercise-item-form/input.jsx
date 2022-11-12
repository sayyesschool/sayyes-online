import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Button, Flex, Label, Input, Switch, Text } from 'shared/ui-components';

function ExerciseInputItem({ item }, ref) {
    const [text, setText] = useState(item.text || '');
    const [items, setItems] = useState(item.items || []);
    const [isInline, toggleInline] = useBoolean(false);

    useImperativeHandle(ref, () => ({
        get data() { return { text, items, inline: isInline }; }
    }));

    const handleTextChange = useCallback(event => {
        setText(event.target.value);
    }, []);

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
        <Flex padding="padding.medium" gap="gap.small" column>
            <Input
                value={text}
                placeholder="Вопрос"
                fluid
                onChange={handleTextChange}
            />

            <Switch
                label="В линию"
                checked={isInline}
                onChange={toggleInline}
            />

            <Flex vAlign="center" gap="gap.smaller">
                <Text>Ответы:</Text>

                <Flex>
                    {items.map(item =>
                        <Label
                            key={item}
                            content={item}
                            icon={
                                <Button
                                    type="button"
                                    icon="delete"
                                    iconOnly
                                    text
                                    onClick={() => handleDeleteItem(item)}
                                />

                            }
                        />
                    )}
                </Flex>

                <input
                    defaultValue=""
                    placeholder="Введите ответ"
                    onKeyPress={handleKeyPress}
                />
            </Flex>
        </Flex>
    );
}

export default forwardRef(ExerciseInputItem);