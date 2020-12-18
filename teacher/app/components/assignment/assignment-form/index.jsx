import React, { useRef, useCallback } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import TextEditor from 'shared/components/text-editor';

import './index.scss';

export default function AssignmentForm({ assignment = {}, onSubmit }) {
    const editorRef = useRef();
    const [data, handleChange] = useForm({
        title: assignment.title || '',
        dueDate: assignment.dueDate || moment().format('YYYY-MM-DD'),
        content: assignment.content || ''
    });

    const handleSubmit = useCallback(() => {
        const content = editorRef.current.editor.getData();

        data.content = content;

        onSubmit(data);
    }, [data]);

    return (
        <Form id="assignment-form" onSubmit={handleSubmit}>
            <Layout column>
                <Layout row>
                    <TextField
                        name="title"
                        value={data.title}
                        label="Название"
                        filled
                        onChange={handleChange}
                    />

                    <TextField
                        type="date"
                        name="dueDate"
                        value={data.dueDate}
                        label="Срок сдачи"
                        filled
                        onChange={handleChange}
                    />
                </Layout>

                <TextEditor
                    ref={editorRef}
                    defaultValue={data.content}
                />
            </Layout>
        </Form>
    );
}