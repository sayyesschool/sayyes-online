import { useCallback, useRef } from 'react';

import useForm from 'shared/hooks/form';
import Form from 'shared/ui-components/form';
import TextEditor from 'shared/components/text-editor';

import './index.scss';

export default function PostForm({ post = {}, onSubmit }) {
    const editorRef = useRef();

    const { data, handleChange } = useForm({
        title: post.title || '',
        content: post.content || ''
    });

    const handleSubmit = useCallback(() => {
        const content = editorRef.current.editor.getData();

        data.content = content;

        onSubmit(data);
    }, [data]);

    return (
        <Form id="post-form" onSubmit={handleSubmit}>
            <Form.Input
                label="Название"
                name="title"
                value={data.title}
                onChange={handleChange}
            />

            <TextEditor
                ref={editorRef}
                defaultValue={data.content}
            />
        </Form>
    );
}