import { useCallback } from 'react';
import {
    Checkbox,
    IconButton,
    List, ListItem
} from 'mdc-react';

import TextField from 'shared/components/text-field';

import ExerciseItemsSection from 'app/components/courses/exercise-items-section';

import './index.scss';

export default function ChoiceExerciseForm({ exercise, onUpdate }) {
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

    const handleMarkItemCorrect = useCallback(itemId => {
        onUpdate({
            items: exercise.items.map(item => item.id !== itemId ? item : ({
                ...item,
                correct: !item.correct
            }))
        });
    }, [exercise, onUpdate]);

    const handleDeleteItem = useCallback(itemId => {
        onUpdate({
            items: exercise.items.filter(a => a.id !== itemId)
        });
    }, [exercise, onUpdate]);

    return (
        <ExerciseItemsSection buttonLabel="Добавить ответ" onAddItem={handleAddItem}>
            <List>
                {exercise.items.map(item =>
                    <ListItem
                        key={item.id}
                        className="exercise-item"
                        selected={item.correct}
                        leadingCheckbox={
                            <Checkbox
                                checked={item.correct}
                                onChange={() => handleMarkItemCorrect(item.id)}
                            />
                        }
                        text={
                            <TextField
                                value={item.text}
                                autoResize
                                onChange={event => handleUpdateItem(item.id, event.target.value)}
                            />
                        }
                        trailingIcon={
                            <IconButton
                                icon="delete"
                                onClick={() => handleDeleteItem(item.id)}
                            />
                        }
                    />
                )}
            </List>
        </ExerciseItemsSection>
    );
}