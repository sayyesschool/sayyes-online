import React, { useCallback } from 'react';
import {
    Card
} from 'mdc-react';

import TextEditor from 'shared/components/text-editor';

import './index.scss';

export default function EssayExerciseForm({ exercise }) {
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