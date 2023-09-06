import { forwardRef, useImperativeHandle, useRef } from 'react';

import ContentEditor from 'shared/components/content-editor';

function EssayItemForm({ content }, ref) {
    const editorRef = useRef();

    useImperativeHandle(ref, () => ({
        get props() {
            return {
                content: editorRef.current?.getData()
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

export default forwardRef(EssayItemForm);