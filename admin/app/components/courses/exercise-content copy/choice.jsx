import { useCallback } from 'react';
import {
    Button,
    Checkbox,
    Text,
    Flex,
    Input
} from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';

import ExerciseItems from 'app/components/courses/exercise-items';

import './index.scss';

export default function ChoiceExerciseContent({ exercise, onUpdate }) {
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

    const handleDeleteItem = useCallback(itemId => {
        onUpdate({
            items: exercise.items.filter(a => a.id !== itemId)
        });
    }, [exercise, onUpdate]);

    return (
        <ExerciseItems buttonLabel="Добавить ответ" onAddItem={handleAddItem}>
            {exercise.items.map(item =>
                <ChoiceExerciseItem
                    key={item}
                    item={item}
                    onUpdate={handleUpdateItem}
                    onDelete={handleDeleteItem}
                />
            )}
        </ExerciseItems>
    );
}

function ChoiceExerciseItem({ item, onUpdate, onDelete }) {
    const handleAddItem = useCallback(() => {
        onUpdate(item.id, {
            items: item.items.concat({
                id: Date.now(),
                text: '',
                correct: false,
                items: []
            })
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
        <div className="exercise-item">
            <Input
                value={item.text}
                fluid
                icon={
                    <Button
                        icon={<Icon>delete</Icon>}
                        iconOnly
                        text
                        onClick={() => onDelete(item.id)}
                    />
                }
            />

            <Text>Ответы:</Text>

            {item.items?.map(item =>
                <Flex key={item.id} vAlign="center">
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
                        icon="delete"
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