import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Chip, Flex, FormField, Input, Switch, Text } from 'shared/ui-components';

import './input.scss';

function InputItemForm({
    text: _text = '',
    values: _values = [],
    inline = false
}, ref) {
    const [text, setText] = useState(_text);
    const [values, setValues] = useState(_values);
    const [isInline, toggleInline] = useBoolean(inline);

    useImperativeHandle(ref, () => ({
        get props() {
            return {
                text,
                values,
                inline: isInline
            };
        }
    }));

    const handleTextChange = useCallback(event => {
        setText(event.target.value);
    }, []);

    const handleDeleteValue = useCallback(newValue => {
        setValues(values => values.filter(v => v !== newValue));
    }, []);

    const handleKeyPress = useCallback(event => {
        if (event.key == 'Enter') {
            event.preventDefault();

            const value = event.target.value;

            if (!value) return;

            setValues(values => values.concat(value));

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

            <Flex gap="medium">
                <Text>В линию</Text>

                <Switch
                    label="В линию"
                    checked={isInline}
                    onChange={toggleInline}
                />
            </Flex>

            <FormField label="Ответы">
                <Input
                    defaultValue=""
                    placeholder="Введите ответ и нажмите Enter"
                    startDecorator={
                        <Chip.Group>
                            {values.map(value =>
                                <Chip
                                    key={value}
                                    content={value}
                                    endDecorator={
                                        <Chip.Delete
                                            onDelete={() => handleDeleteValue(value)}
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

export default forwardRef(InputItemForm);