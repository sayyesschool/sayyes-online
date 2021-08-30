import React, { useCallback } from 'react';
import {
    Button,
    ChipSet, Chip,
    FormField,
    Icon,
    TextField,
    Typography
} from 'mdc-react';

import './index.scss';

export default function TextExerciseForm({ exercise, onUpdate }) {
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
        console.log(itemId, data);
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
            <Typography className="elements-label">Элементы</Typography>

            {exercise.items.map(item =>
                <TextExerciseItemForm
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

function TextExerciseItemForm({ item, onUpdate, onDelete }) {
    const handleUpdateText = useCallback(event => {
        onUpdate(item.id, {
            text: event.target.value
        });
    }, [item]);

    const handleAddAnswer = useCallback(values => {
        onUpdate(item.id, {
            answers: values
        });
    }, [item]);

    const handleDeleteAnswer = useCallback(answer => {
        onUpdate(item.id, {
            answers: item.answers.filter(a => a !== answer)
        });
    }, [item]);

    return (
        <div className="exercise-item">
            <TextField
                value={item.text}
                trailingIcon={<Icon onClick={() => onDelete(item)}>delete</Icon>}
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