import { useCallback, useRef } from 'react';
import { Button } from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';
import PageSection from 'shared/components/page-section';
import TextEditor from 'shared/components/text-editor';

import './index.scss';

export default function LessonContent({ lesson = {}, onUpdate }) {
    const editorRef = useRef();

    const handleSave = useCallback(() => {
        const content = editorRef.current.editor.getData();

        onUpdate({ content });
    }, [onUpdate]);

    return (
        <PageSection
            className="lesson-content"
            title="Содержание"
            actions={
                <Button
                    icon={<Icon name="save" />}
                    iconOnly
                    text
                    onClick={handleSave}
                />
            }
            compact
        >
            <TextEditor
                ref={editorRef}
                defaultValue={lesson.content}
            />
        </PageSection>
    );
}