import { useCallback } from 'react';

import TextContent from 'shared/components/text-content';
import TextEditor from 'shared/components/text-editor';

export default function EssayExerciseContent({ item, state, onUpdateState }) {
    const handleChange = useCallback((event, value) => {
        onUpdateState(item.id, value);
    }, [item, onUpdateState]);

    return (
        <>
            <TextContent
                content={item.text}
            />

            <TextEditor
                value={state}
                onChange={handleChange}
            />
        </>
    );
}