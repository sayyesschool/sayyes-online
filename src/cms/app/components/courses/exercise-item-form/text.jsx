import { forwardRef, useImperativeHandle, useRef } from 'react';

import ContentEditor from 'shared/components/content-editor';

function TextItemForm({ content }, ref) {
    const editorRef = useRef();

    useImperativeHandle(ref, () => ({
        get props() {
            return {
                content: editorRef.current.editor.getData()
            };
        }
    }));

    return (
        <ContentEditor
            ref={editorRef}
            content={content}
        />
    );
}

export default forwardRef(TextItemForm);