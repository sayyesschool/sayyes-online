import { useCallback, useRef } from 'react';

import ContentEditor from 'shared/components/content-editor';
import Form from 'shared/ui-components/form';

import './index.scss';

export default function CommentForm({ comment = {}, onSubmit, ...props }) {
    const editorRef = useRef();

    const handleSubmit = useCallback(() => {
        const content = editorRef.current.editor.getData();

        onSubmit({ content });
    }, []);

    return (
        <Form className="CommentForm" onSubmit={handleSubmit} {...props}>
            <ContentEditor
                ref={editorRef}
                defaultValue={comment.content}
            />
        </Form>
    );
}