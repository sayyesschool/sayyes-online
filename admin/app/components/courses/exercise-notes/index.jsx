import { useCallback, useRef } from 'react';
import {
    IconButton,
    Card
} from 'mdc-react';

import TextEditor from 'shared/components/text-editor';

export default function ExerciseCard({ exercise, onUpdate }) {
    const textEditorRef = useRef();

    const handleSave = useCallback(data => {
        const notes = textEditorRef.current.editor.getData();

        data.notes = notes;

        onUpdate(exercise.id, data);
    }, [exercise, onUpdate]);

    return (
        <section className="exercise-notes">
            <Card>
                <Card.Header
                    title="Заметки"
                    actions={[
                        <IconButton
                            key="save"
                            icon="save"
                            onClick={handleSave}
                        />
                    ]}
                />

                <Card.Section primary>
                    <TextEditor
                        ref={textEditorRef}
                        value={exercise.notes}
                    />
                </Card.Section>
            </Card>
        </section>
    );
}