import { useCallback, useRef } from 'react';

import ContentEditor from 'shared/components/content-editor';
import PageSection from 'shared/components/page-section';

export default function LessonDescription({ lesson = {}, onUpdate }) {
    const editorRef = useRef();

    const handleSave = useCallback(() => {
        const description = editorRef.current.editor.getData();

        onUpdate({ description });
    }, [onUpdate]);

    return (
        <PageSection
            className="LessonDescription"
            title="Содержание"
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
                content={lesson.description}
            />
        </PageSection>
    );
}