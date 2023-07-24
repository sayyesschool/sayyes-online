import { useCallback, useRef } from 'react';

import ContentEditor from 'shared/components/content-editor';
import PageSection from 'shared/components/page-section';

export default function CourseContent({ course = {}, onUpdate }) {
    const editorRef = useRef();

    const handleSave = useCallback(() => {
        const description = editorRef.current?.getData();

        onUpdate({ description });
    }, [onUpdate]);

    return (
        <PageSection
            className="CourseDescription"
            title="Описание"
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
                content={course.description}
            />
        </PageSection>
    );
}