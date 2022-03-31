import { useCallback } from 'react';
import {
    Button,
    Flex,
    Label,
    Input
} from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';

import './index.scss';

export default function InputExerciseItems({ items, onUpdate }) {
    const handleUpdateItem = useCallback((itemId, data) => {
        onUpdate(items => items.map(item => item.id !== itemId ? item : { ...item, ...data }));
    }, [onUpdate]);

    const handleDeleteItem = useCallback(itemId => {
        onUpdate(items => items.filter(i => i.id !== itemId));
    }, [onUpdate]);

    return items.map(item =>
        <InputExerciseItem
            key={item.id}
            item={item}
            onUpdate={handleUpdateItem}
            onDelete={handleDeleteItem}
        />
    );
}

function InputExerciseItem({ item, onUpdate, onDelete }) {
    const handleUpdateText = useCallback(event => {
        onUpdate(item.id, {
            text: event.target.value
        });
    }, [item, onUpdate]);

    const handleKeyPress = useCallback(event => {
        if (event.key == 'Enter') {
            event.preventDefault();

            const value = event.target.value;

            onUpdate(item.id, {
                answers: item.answers?.concat(value) || [value]
            });

            event.target.value = '';

            return false;
        }
    }, [item, onUpdate]);

    const handleDeleteAnswer = useCallback(answer => {
        onUpdate(item.id, {
            answers: item.answers.filter(a => a !== answer)
        });
    }, [item, onUpdate]);

    const handleDelete = useCallback(() => {
        onDelete(item.id);
    }, [item, onDelete]);

    return (
        <div className="exercise-item exercise-item--input">
            <Input
                value={item.text}
                icon={
                    <Button
                        type="button"
                        icon={<Icon>delete</Icon>}
                        iconOnly
                        text
                        onClick={handleDelete}
                    />
                }
                fluid
                onChange={handleUpdateText}
            />

            <Flex vAlign="center">
                <label>Варианты ответа:</label>

                {item.answers?.map(answer =>
                    <Label
                        content={answer}
                        icon={
                            <Button
                                icon={<Icon>delete</Icon>}
                                iconOnly
                                text
                                onClick={() => handleDeleteAnswer(answer)}
                            />

                        }
                    />
                )}

                <input
                    element="div"
                    defaultValue=""
                    placeholder="Введите ответ"
                    onKeyPress={handleKeyPress}
                />
            </Flex>
        </div>
    );
}