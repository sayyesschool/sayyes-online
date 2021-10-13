import React, { useCallback } from 'react';
import {
    Button,
    ChipSet, Chip,
    FormField,
    Icon,
    IconButton,
    TextField,
    Typography
} from 'mdc-react';

import './index.scss';

export default function InputExerciseForm({ exercise, onUpdate }) {
    const handleAddItem = useCallback(() => {
        onUpdate({
            ...exercise,
            items: exercise.items.concat({
                id: Date.now(),
                text: '',
                answers: []
            })
        });
    }, [exercise, onUpdate]);

    const handleUpdateItem = useCallback((itemId, data) => {
        onUpdate({
            items: exercise.items.map(item => item.id !== itemId ? item : { ...item, ...data })
        });
    }, [exercise, onUpdate]);

    const handleDeleteItem = useCallback(itemId => {
        onUpdate({
            items: exercise.items.filter(a => a.id !== itemId)
        });
    }, [exercise, onUpdate]);

    return (
        <section>
            <Typography type="subtitle2" className="elements-label">Элементы</Typography>

            {exercise.items.map(item =>
                <InputExerciseItemForm
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdateItem}
                    onDelete={handleDeleteItem}
                />
            )}

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

function InputExerciseItemForm({ item, onUpdate, onDelete }) {
    const handleUpdateText = useCallback(event => {
        onUpdate(item.id, {
            text: event.target.value
        });
    }, [item, onUpdate]);

    const handleAddAnswer = useCallback(values => {
        onUpdate(item.id, {
            answers: values
        });
    }, [item, onUpdate]);

    const handleDeleteAnswer = useCallback(answer => {
        onUpdate(item.id, {
            answers: item.answers.filter(a => a !== answer)
        });
    }, [item, onUpdate]);

    return (
        <div className="exercise-item">
            <TextField
                value={item.text}
                trailingIcon={
                    <IconButton
                        icon="delete"
                        onClick={() => onDelete(item)}
                    />
                }
                filled
                onChange={handleUpdateText}
            />

            <FormField label="Варианты ответа:" alignEnd>
                <ChipSet value={item.answers} input onChange={handleAddAnswer}>
                    {item.answers?.map(answer =>
                        <Chip
                            text={answer}
                            trailingIcon={
                                <Icon onClick={() => handleDeleteAnswer(answer)}>delete</Icon>
                            }
                        />
                    )}
                </ChipSet>
            </FormField>
        </div>
    );
}