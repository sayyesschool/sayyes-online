import { useCallback, useRef } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import TextEditor from 'shared/components/text-editor';

import './index.scss';

export default function PostForm({ post = {}, onSubmit }) {
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
        <Form id="post-form" onSubmit={handleSubmit}>
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