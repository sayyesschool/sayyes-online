import { useCallback, useRef } from 'react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FormInput from 'shared/components/form-input';
import TextEditor from 'shared/components/text-editor';

import './index.scss';

export default function PostForm({ id = 'post-form', post = {}, onSubmit }) {
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
        <Form id={id} className="post-form" onSubmit={handleSubmit}>
            <FormInput
                name="title"
                value={data.title}
                placeholder="Название"
                inverted
                onChange={handleChange}
            />

            <TextEditor
                ref={editorRef}
                defaultValue={data.content}
            />
        </Form>
    );
}