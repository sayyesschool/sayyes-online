import React, { useRef, useCallback } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import TextEditor from 'shared/components/text-editor';

import './index.scss';

export default function PostForm({ id = 'post-form', post = {}, onSubmit }) {
    const editorRef = useRef();
    const [data, handleChange] = useForm({
        title: post.title || '',
        content: post.content || ''
    });

    const handleSubmit = useCallback(() => {
        const content = editorRef.current.editor.getData();

        data.content = content;

        onSubmit(data);
    }, [data]);

    return (
        <Form id={id} className="post-form" onSubmit={handleSubmit}>
            <Layout column>
                <TextField
                    name="title"
                    value={data.title}
                    label="Название"
                    filled
                    onChange={handleChange}
                />

                <TextEditor
                    ref={editorRef}
                    defaultValue={data.content}
                />
            </Layout>
        </Form>
    );
}