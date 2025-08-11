import { useCallback, useRef } from 'react';

import ContentEditor from 'shared/components/content-editor';
import PageSection from 'shared/components/page-section';

export default function ExerciseNotes({ exercise, onUpdate }) {
    const editorRef = useRef();

    const handleSave = useCallback(() => {
        const notes = editorRef.current?.getData();

        onUpdate({ notes });
    }, [onUpdate]);

    return (
        <PageSection
            className="ExerciseNotes"
            title="Заметки преподавателя"
            actions={[{
                key: 'save',
                icon: 'save',
                title: 'Сохранить',
                onClick: handleSave
            }]}
            compact
        >
            <ContentEditor
                ref={editorRef}
                content={exercise.notes}
                simple
            />
        </PageSection>
    );
}