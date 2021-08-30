import React, { useRef, useCallback } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FileInput from 'shared/components/file-input';

export default function LessonForm({ lesson = {}, course, onSubmit }) {
    const fileInputRef = useRef();
    const [data, handleChange, getData] = useForm({
        title: lesson.title,
        slug: lesson.slug,
        image: lesson.image
    }, [lesson]);

    const handleSubmit = useCallback(() => {
        const file = fileInputRef.current.input.files[0];

        if (file) {
            file.path = `courses/${course.id}/images/`;
        }

        getData(data => {
            onSubmit(Object.assign(data, { file }));
            return data;
        });
        fileInputRef.current.reset();
    }, [onSubmit]);

    return (
        <Form id="lesson-form" onSubmit={handleSubmit}>
            <Layout column>
                <TextField
                    name="title"
                    label="Название"
                    value={data.title}
                    filled
                    onChange={handleChange}
                />

                <TextField
                    name="slug"
                    label="Слаг"
                    value={data.slug}
                    filled
                    onChange={handleChange}
                />

                <FileInput
                    ref={fileInputRef}
                    name="image"
                    label="Изображение"
                />
            </Layout>
        </Form>
    );
}

LessonForm.defaultProps = {
    lesson: {
        title: '',
        slug: '',
        image: ''
    }
};