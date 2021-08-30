import React, { useCallback } from 'react';
import {
    Button,
    Icon,
    IconButton,
    List, ListItem,
    Switch,
    Typography
} from 'mdc-react';

import TextField from 'shared/components/text-field';

import './index.scss';

export default function BooleanExerciseForm({ exercise, onUpdate }) {
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
        <section>
            <Typography className="elements-label">Элементы</Typography>

            <List>
                {exercise.items.map(item =>
                    <ListItem
                        key={item.id}
                        className="exercise-item"
                        graphic={
                            <Switch
                                checked={item.correct}
                                onChange={() => handleItemCorrect(item.id)}
                            />
                        }
                        text={
                            <TextField
                                value={item.text}
                                autoResize
                                onChange={event => handleUpdateItem(item.id, event.target.value)}
                            />
                        }
                        meta={
                            <IconButton
                                icon="delete"
                                onClick={() => handleDeleteItem(item.id)}
                            />
                        }
                    />
                )}
            </List>

            <Button
                className="new-item-button"
                type="button"
                icon={<Icon>add</Icon>}
                label="Добавить элемент"
                outlined
                onClick={handleAddItem}
            />
        </section>
    );
}