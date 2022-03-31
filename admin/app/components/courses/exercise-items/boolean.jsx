import { useCallback } from 'react';
import {
    Button,
    Checkbox,
    Flex,
    Input
} from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';

import './index.scss';

export default function BooleanExerciseItems({ items, onUpdate }) {
    const handleAddItem = useCallback(() => {
        onUpdate(items => items.concat({
            id: Date.now(),
            text: '',
            correct: false
        }));
    }, [onUpdate]);

    const handleUpdateItem = useCallback((itemId, text) => {
        onUpdate(items => items.map(item => item.id !== itemId ? item : { ...item, text }));
    }, [onUpdate]);

    const handleItemCorrect = useCallback(itemId => {
        onUpdate(items => items.map(item => ({
            ...item,
            correct: item.id === itemId ? !item.correct : item.correct
        })));
    }, [onUpdate]);

    const handleDeleteItem = useCallback(itemId => {
        onUpdate(items => items.filter(item => item.id !== itemId));
    }, [onUpdate]);

    return items.map(item =>
        <Flex className="exercise-item exercise-item--boolean" vAlign="center">
            <Checkbox
                checked={item.correct}
                onChange={() => handleItemCorrect(item.id)}
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
    );
}