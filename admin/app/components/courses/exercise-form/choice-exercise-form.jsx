import { useCallback } from 'react';
import {
    Button,
    Checkbox,
    IconButton,
    List, ListGroup, ListItem,
    TextField
} from 'mdc-react';

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

    const handleDeleteItem = useCallback(itemId => {
        onUpdate({
            items: exercise.items.filter(a => a.id !== itemId)
        });
    }, [exercise, onUpdate]);

    return (
        <ExerciseItemsSection buttonLabel="Добавить ответ" onAddItem={handleAddItem}>
            <ListGroup>
                {exercise.items.map(item =>
                    <ChoiceExerciseItem
                        item={item}
                        onUpdate={handleUpdateItem}
                        onDelete={handleDeleteItem}
                    />
                )}
            </ListGroup>
        </ExerciseItemsSection>
    );
}

function ChoiceExerciseItem({ item, onUpdate, onDelete }) {
    const handleAddItem = useCallback(() => {
        onUpdate(item.id, {
            items: item.items.concat({
                id: Date.now(),
                text: '',
                correct: false
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
            <TextField
                value={item.text}
                tailingIcon={
                    <IconButton
                        icon="delete"
                        onClick={() => onDelete(item.id)}
                    />
                }
            />

            <List>
                {item.items.map(item =>
                    <ListItem
                        key={item.id}
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

                <ListItem
                    text="Добавить ответ"
                    onClick={handleAddItem}
                />
            </List>
        </div>
    );
}