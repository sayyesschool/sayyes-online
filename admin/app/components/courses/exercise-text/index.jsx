import { useCallback, useRef } from 'react';
import { Button } from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';
import PageSection from 'shared/components/page-section';
import TextEditor from 'shared/components/text-editor';

import './index.scss';

export default function ExerciseText({ exercise, onUpdate }) {
    const textEditorRef = useRef();

    const handleUpdate = useCallback(() => {
        const text = textEditorRef.current.editor.getData();

        onUpdate({ text });
    }, [onUpdate]);

    return (
        <PageSection
            className="exercise-text"
            title="Текст"
            actions={
                <Button
                    icon={<Icon>save</Icon>}
                    iconOnly
                    text
                    onClick={handleUpdate}
                />
            }
        >
            <TextEditor
                ref={textEditorRef}
                value={exercise.text}
            />
        </PageSection>
    );
}