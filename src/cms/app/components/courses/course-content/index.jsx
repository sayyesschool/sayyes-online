import { useCallback, useRef } from 'react';

import PageSection from 'shared/components/page-section';
import TextEditor from 'shared/components/text-editor';

export default function CourseContent({ course = {}, onUpdate }) {
    const editorRef = useRef();

    const handleSave = useCallback(() => {
        const content = editorRef.current.editor.getData();

        onUpdate({ content });
    }, [onUpdate]);

    return (
        <PageSection
            className="CourseContent"
            title="Содержание"
            actions={[{
                key: 'save',
                icon: 'save',
                title: 'Сохранить',
                onClick: handleSave
            }]}
            compact
        >
            <TextEditor
                ref={editorRef}
                defaultValue={course.description}
            />
        </PageSection>
    );
}