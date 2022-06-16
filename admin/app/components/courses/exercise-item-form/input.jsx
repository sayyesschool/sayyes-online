import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import {
    Button,
    Flex,
    Label,
    Input,
    Text
} from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';

function ExerciseInputItem({ item }, ref) {
    const [text, setText] = useState(item.text || '');
    const [items, setItems] = useState(item.items || []);

    useImperativeHandle(ref, () => ({
        get data() { return { text, items }; }
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
                                    icon={<Icon>delete</Icon>}
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