import { useCallback, useRef } from 'react';
import {
    Card,
    Icon,
    IconButton
} from 'mdc-react';

import TextEditor from 'shared/components/text-editor';

import './index.scss';

export default function UnitContent({ unit = {}, onUpdate }) {
    const editorRef = useRef();

    const handleSubmit = useCallback(() => {
        const content = editorRef.current.editor.getData();

        onUpdate({ content });
    }, [onUpdate]);

    return (
        <section className="unit-content">
            <Card>
                <Card.Header
                    graphic={<Icon>article</Icon>}
                    title="Содержание"
                    actions={
                        <IconButton
                            icon="save"
                            onClick={handleSubmit}
                        />
                    }
                />

                <Card.Section>
                    <TextEditor
                        ref={editorRef}
                        defaultValue={unit.content}
                    />
                </Card.Section>
            </Card>
        </section>
    );
}