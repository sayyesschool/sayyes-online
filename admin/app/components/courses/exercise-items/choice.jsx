import { useCallback } from 'react';
import {
    Button,
    Checkbox,
    Text,
    Flex,
    Input
} from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';

import './index.scss';

export default function ChoiceExerciseItems({ items, onUpdate }) {
    const handleUpdateItem = useCallback((itemId, data) => {
        onUpdate(items => items.map(item => item.id !== itemId ? item : { ...item, ...data }));
    }, [onUpdate]);

    const handleDeleteItem = useCallback(itemId => {
        onUpdate(items => items.filter(a => a.id !== itemId));
    }, [onUpdate]);

    return items.map(item =>
        <ChoiceExerciseItem
            key={item}
            item={item}
            onUpdate={handleUpdateItem}
            onDelete={handleDeleteItem}
        />
    );
}

function ChoiceExerciseItem({ item, onUpdate, onDelete }) {
    const handleUpdate = useCallback(event => {
        onUpdate(item.id, { text: event.target.value });
    }, [item, onUpdate]);

    const handleDelete = useCallback(() => {
        onDelete(item.id);
    }, [item, onDelete]);

    const handleAddItem = useCallback(() => {
        const newItem = {
            id: Date.now(),
            text: '',
            correct: false
        };

        onUpdate(item.id, {
            items: item.items?.concat(newItem) || [newItem]
        });
    }, [item, onUpdate]);

    const handleUpdateItem = useCallback((itemId, text) => {
        onUpdate(item.id, {
            items: item.items.map(item => item.id !== itemId ? item : { ...item, text })
        });
    }, [item, onUpdate]);

    const handleMarkItemCorrect = useCallback(itemId => {
        onUpdate(item.id, {
            items: item.items.map(item => item.id !== itemId ? item : ({
                ...item,
                correct: !item.correct
            }))
        });
    }, [item, onUpdate]);

    const handleDeleteItem = useCallback(itemId => {
        onUpdate(item.id, {
            items: item.items.filter(a => a.id !== itemId)
        });
    }, [item, onUpdate]);

    return (
        <div className="exercise-item exercise-item--choice">
            <Flex vAlign="center">
                <Input
                    value={item.text}
                    fluid
                    onChange={handleUpdate}
                />

                <Button
                    icon={<Icon>delete</Icon>}
                    iconOnly
                    text
                    onClick={handleDelete}
                />
            </Flex>

            <Text as="label">Ответы:</Text>

            {item.items?.map(item =>
                <Flex key={item.id} className="exercise-item__item" vAlign="center">
                    <Checkbox
                        checked={item.correct}
                        onChange={() => handleMarkItemCorrect(item.id)}
                    />

                    <Input
                        value={item.text}
                        fluid
                        onChange={event => handleUpdateItem(item.id, event.target.value)}
                    />

                    <Button
                        icon={<Icon>delete</Icon>}
                        iconOnly
                        text
                        onClick={() => handleDeleteItem(item.id)}
                    />
                </Flex>
            )}

            <Button
                content="Добавить ответ"
                fluid
                onClick={handleAddItem}
            />
        </div>
    );
}