import { useCallback } from 'react';
import {
    ChipSet, Chip,
    FormField,
    Icon,
    IconButton,
    TextField
} from 'mdc-react';

import ExerciseItemsSection from 'app/components/courses/exercise-items-section';

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
            items: exercise.items.filter(i => i.id !== itemId)
        });
    }, [exercise, onUpdate]);

    return (
        <ExerciseItemsSection onAddItem={handleAddItem}>
            {exercise.items.map(item =>
                <InputExerciseItemForm
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdateItem}
                    onDelete={handleDeleteItem}
                />
            )}
        </ExerciseItemsSection>
    );
}

function InputExerciseItemForm({ item, onUpdate, onDelete }) {
    const handleUpdateText = useCallback(event => {
        onUpdate(item.id, {
            text: event.target.value
        });
    }, [item, onUpdate]);

    const handleDeleteAnswer = useCallback(answer => {
        onUpdate(item.id, {
            answers: item.answers.filter(a => a !== answer)
        });
    }, [item, onUpdate]);

    const handleKeyPress = useCallback(event => {
        if (event.code == 'Enter') {
            event.preventDefault();

            onUpdate(item.id, {
                answers: item.answers.concat(event.target.value)
            });

            event.target.value = '';

            return false;
        }
    }, [item, onUpdate]);

    const handleDelete = useCallback(() => {
        onDelete(item.id);
    }, [item, onDelete]);

    return (
        <div className="exercise-item">
            <TextField
                value={item.text}
                trailingIcon={
                    <IconButton
                        icon="delete"
                        type="button"
                        onClick={handleDelete}
                    />
                }
                filled
                onChange={handleUpdateText}
            />

            <FormField label="Варианты ответа:" alignEnd>
                <>
                    <ChipSet input>
                        {item.answers?.map(answer =>
                            <Chip
                                text={answer}
                                trailingIcon={
                                    <Icon onClick={() => handleDeleteAnswer(answer)}>delete</Icon>
                                }
                            />
                        )}
                    </ChipSet>

                    <TextField
                        element="div"
                        defaultValue=""
                        onKeyPress={handleKeyPress}
                    />
                </>
            </FormField>
        </div>
    );
}