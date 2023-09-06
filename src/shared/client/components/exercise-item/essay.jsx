import { useCallback } from 'react';

import Content from 'shared/components/content';
import ContentEditor from 'shared/components/content-editor';

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
            <Content content={content} html />

            <ContentEditor
                content={state}
                simple
                onChange={handleChange}
            />
        </div>
    );
}