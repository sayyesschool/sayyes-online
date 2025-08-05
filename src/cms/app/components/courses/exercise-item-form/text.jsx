import { forwardRef, useImperativeHandle, useRef } from 'react';

import ContentEditor from 'shared/components/content-editor';
import { STORAGE_API } from 'shared/constants';

function TextItemForm({ content }, ref) {
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
            uploadUrl={`${STORAGE_API}`}
        />
    );
}

export default forwardRef(TextItemForm);