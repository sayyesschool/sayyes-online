import { useCallback, useRef } from 'react';

import ContentEditor from 'shared/components/content-editor';
import PageSection from 'shared/components/page-section';

export default function ExerciseDescription({ exercise, onUpdate }) {
    const editorRef = useRef();

    const handleUpdate = useCallback(() => {
        const description = editorRef.current?.getData();

        onUpdate({ description });
    }, [onUpdate]);

    return (
        <PageSection
            className="ExerciseDescription"
            title="Описание"
            actions={[{
                key: 'save',
                icon: 'save',
                title: 'Сохранить',
                onClick: handleUpdate
            }]}
            compact
        >
            <ContentEditor
                ref={editorRef}
                content={exercise.description}
            />
        </PageSection>
    );
}