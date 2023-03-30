import { useCallback, useRef } from 'react';

import PageSection from 'shared/components/page-section';
import TextEditor from 'shared/components/text-editor';

export default function ExerciseNotes({ exercise, onUpdate }) {
    const textEditorRef = useRef();

    const handleSave = useCallback(() => {
        const notes = textEditorRef.current.editor.getData();

        onUpdate({ notes });
    }, [onUpdate]);

    return (
        <PageSection
            className="exercise-notes"
            title="Заметки"
            actions={[{
                key: 'save',
                icon: 'save',
                title: 'Сохранить',
                onClick: handleSave
            }]}
            compact
        >
            <TextEditor
                ref={textEditorRef}
                value={exercise.notes}
            />
        </PageSection>
    );
}