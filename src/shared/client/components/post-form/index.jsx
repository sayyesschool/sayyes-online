import { useCallback, useRef } from 'react';

import { useFormData } from 'shared/hooks/form';
import ContentEditor from 'shared/components/content-editor';
import Form from 'shared/ui-components/form';

import './index.scss';

export default function PostForm({
    id = 'post-form',
    post = {},
    onSubmit
}) {
    const editorRef = useRef();

    const { data, handleChange } = useFormData({
        title: post.title || '',
        content: post.content || ''
    });

    const handleSubmit = useCallback(() => {
        const content = editorRef.current.editor.getData();

        data.content = content;

        onSubmit(data);
    }, [data]);

    return (
        <Form id={id} className="PostForm" onSubmit={handleSubmit}>
            <Form.Input
                name="title"
                value={data.title}
                placeholder="Название"
                onChange={handleChange}
            />

            <ContentEditor
                ref={editorRef}
                defaultValue={data.content}
            />
        </Form>
    );
}