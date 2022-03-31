import { useCallback } from 'react';
import {
    Button,
    Checkbox,
    Flex,
    Input
} from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';

import ExerciseItems from 'app/components/courses/exercise-items';

import './index.scss';

export default function BooleanExerciseContent({ exercise, onUpdate }) {
    const handleAddItem = useCallback(() => {
        onUpdate({
            items: exercise.items.concat({
                id: Date.now(),
                text: '',
                correct: false
            })
        });
    }, [exercise, onUpdate]);

    const handleUpdateItem = useCallback((itemId, text) => {
        onUpdate({
            items: exercise.items.map(item => item.id !== itemId ? item : { ...item, text })
        });
    }, [exercise, onUpdate]);

    const handleItemCorrect = useCallback(itemId => {
        onUpdate({
            items: exercise.items.map(item => ({
                ...item,
                correct: item.id === itemId ? !item.correct : item.correct
            }))
        });
    }, [exercise, onUpdate]);

    const handleDeleteItem = useCallback(itemId => {
        onUpdate({
            items: exercise.items.filter(item => item.id !== itemId)
        });
    }, [exercise, onUpdate]);

    return (
        <ExerciseItems onAddItem={handleAddItem}>
            {exercise.items.map(item =>
                <Flex className="exercise-item" vAlign="center">
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
            )}
        </ExerciseItems>
    );
}