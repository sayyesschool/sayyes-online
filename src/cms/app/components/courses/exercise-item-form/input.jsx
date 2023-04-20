import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Chip, Flex, FormField, Input } from 'shared/ui-components';

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
        <Flex padding={1} gap="small" column>
            <Input
                value={text}
                placeholder="Вопрос"
                fluid
                onChange={handleTextChange}
            />

            {/* <Flex>
                <Text>В линию</Text>

                <Switch
                    label="В линию"
                    checked={isInline}
                    onChange={toggleInline}
                />
            </Flex> */}

            <FormField label="Ответы">
                <Input
                    defaultValue=""
                    placeholder="Введите ответ и нажмите Enter"
                    startDecorator={
                        <Chip.Group>
                            {items.map(item =>
                                <Chip
                                    key={item}
                                    content={item}
                                    endDecorator={
                                        <Chip.Delete
                                            onDelete={() => handleDeleteItem(item)}
                                        />
                                    }
                                    size="sm"
                                    color="neutral"
                                    variant="outlined"
                                />
                            )}
                        </Chip.Group>
                    }
                    onKeyPress={handleKeyPress}
                />
            </FormField>
        </Flex>
    );
}

export default forwardRef(ExerciseInputItem);