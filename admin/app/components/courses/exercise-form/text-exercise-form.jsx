import React, { useCallback } from 'react';
import {
    Card
} from 'mdc-react';

import TextEditor from 'shared/components/text-editor';

import './index.scss';

export default function TextExerciseForm({ exercise, onUpdate }) {
    const handleUpdate = useCallback((event, value) => {
        onUpdate({
            text: value
        });
    }, []);

    return (
        <Card outlined>
            <TextEditor
                value={exercise.text}
                onChange={handleUpdate}
            />
        </Card>
    );
}

function TextExerciseItemForm({ item, onUpdate, onDelete }) {
    const handleUpdate = useCallback(event => {
        onUpdate(item.id, {
            text: event.target.value
        });
    }, [item]);

    const handleDelete = useCallback(answer => {
        onUpdate(item.id, {
            answers: item.answers.filter(a => a !== answer)
        });
    }, [item]);

    return (
        <div className="exercise-item">
            <TextEditor
                value={item.text}
                onChange={handleChange}
            />
        </div>
    );
}