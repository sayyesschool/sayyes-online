import { useCallback } from 'react';

import TextEditor from 'shared/components/text-editor';
import TextContent from 'shared/components/text-content';

import './essay.scss';

export default function EssayItem({
    id,
    content,
    state,
    onUpdateState,
    className
}) {
    const handleChange = useCallback((event, value) => {
        onUpdateState(id, value);
    }, [id, onUpdateState]);

    return (
        <div className={className}>
            <TextContent
                content={content}
            />

            <TextEditor
                text={state}
                onChange={handleChange}
            />
        </div>
    );
}