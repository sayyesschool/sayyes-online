import { useCallback } from 'react';

import ContentEditor from 'shared/components/content-editor';
import TextContent from 'shared/components/text-content';

export default function EssayExerciseContent({
    item,
    state,
    onUpdateState
}) {
    const handleChange = useCallback((event, value) => {
        onUpdateState(item.id, value);
    }, [item, onUpdateState]);

    return (
        <>
            <TextContent
                content={item.text}
            />

            <ContentEditor
                content={state}
                onChange={handleChange}
            />
        </>
    );
}