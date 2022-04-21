import { useCallback } from 'react';
import {
    Button
} from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';
import TextEditor from 'shared/components/text-editor';

export default function FIBExerciseForm({ items, onUpdate }) {
    const handleUpdateItem = useCallback((itemId, data) => {
        onUpdate(items => items.map(item => item.id !== itemId ? item : { ...item, ...data }));
    }, [onUpdate]);

    const handleDeleteItem = useCallback(itemId => {
        onUpdate(items => items.filter(item => item.id !== itemId));
    }, [onUpdate]);

    return items.map(item =>
        <FIBExerciseItemForm
            key={item.id}
            item={item}
            onUpdate={handleUpdateItem}
            onDelete={handleDeleteItem}
        />
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
        <div className="exercise-item exercise-item--fib">
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