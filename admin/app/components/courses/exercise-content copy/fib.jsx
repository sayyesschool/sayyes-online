import { useCallback } from 'react';
import {
    Box,
    Button,
    Flex
} from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';
import TextEditor from 'shared/components/text-editor';

import ExerciseItems from 'app/components/courses/exercise-items';

export default function FIBExerciseForm({ exercise, onUpdate }) {
    const handleAddItem = useCallback(() => {
        onUpdate({
            ...exercise,
            items: exercise.items.concat({
                id: Date.now(),
                text: ''
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
            items: exercise.items.filter(item => item.id !== itemId)
        });
    }, [exercise, onUpdate]);

    return (
        <ExerciseItems onAddItem={handleAddItem}>
            {exercise.items.map(item =>
                <FIBExerciseItemForm
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdateItem}
                    onDelete={handleDeleteItem}
                />
            )}
        </ExerciseItems>
    );
}

function FIBExerciseItemForm({ item, onUpdate, onDelete }) {
    const handleChange = useCallback((event, value) => {
        onUpdate(item.id, {
            text: value
        });
    }, [item]);

    const handleDelete = useCallback(() => {
        onDelete(item.id);
    }, []);

    return (
        <div className="exercise-item">
            <TextEditor
                value={item.text}
                onChange={handleChange}
            />

            <Button
                icon={<Icon>delete</Icon>}
                iconOnly
                text
                onClick={handleDelete}
            />
        </div>
    );
}