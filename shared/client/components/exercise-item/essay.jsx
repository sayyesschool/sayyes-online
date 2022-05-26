import { useCallback } from 'react';

import TextContent from 'shared/components/text-content';
import TextEditor from 'shared/components/text-editor';

export default function EssayExerciseContent({ item, state, setState }) {
    const handleChange = useCallback((event, value) => {
        setState(value);
    }, []);

    return (
        <>
            <TextContent>{item.text}</TextContent>

            <TextEditor
                value={state}
                onChange={handleChange}
            />
        </>
    );
}