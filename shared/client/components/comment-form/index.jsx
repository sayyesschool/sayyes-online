import React, { useRef, useCallback } from 'react';
import {
    Button
} from 'mdc-react';

import Form from 'shared/components/form';
import TextEditor from 'shared/components/text-editor';

import './index.scss';

export default function CommentForm({ comment = {}, onSubmit, ...props }) {
    const editorRef = useRef();

    const handleSubmit = useCallback(() => {
        const content = editorRef.current.editor.getData();

        onSubmit({ content });
    }, []);

    return (
        <Form className="comment-form" onSubmit={handleSubmit} {...props}>
            <TextEditor
                ref={editorRef}
                defaultValue={comment.content}
            />
        </Form>
    );
}