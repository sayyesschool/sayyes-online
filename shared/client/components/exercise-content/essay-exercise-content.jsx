import { useCallback } from 'react';

import TextEditor from 'shared/components/text-editor';

export default function EssayExerciseContent({ exercise, state, setState }) {
    const handleChange = useCallback((event, value) => {
        setState(value);
    }, []);

    return (
        <div className="essay-exercise-content">
            <TextEditor
                value={state}
                onChange={handleChange}
            />
        </div>
    );
}