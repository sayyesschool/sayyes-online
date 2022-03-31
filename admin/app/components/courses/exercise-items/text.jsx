import { useCallback } from 'react';

import TextEditor from 'shared/components/text-editor';

import './index.scss';

export default function TextExerciseItems({ onUpdate }) {
    return null;
}

function TextExerciseItem({ item, onUpdate, onDelete }) {
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