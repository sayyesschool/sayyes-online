import React, { useRef, useCallback } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FileInput from 'shared/components/file-input';

export default function CourseForm({ course = {}, onSubmit }) {
    const fileInputRef = useRef();
    const [data, handleChange, getData] = useForm({
        title: course.title,
        slug: course.slug,
        description: course.description,
        image: course.image
    }, [course]);

    const handleSubmit = useCallback(() => {
        const file = fileInputRef.current.input.files[0];

        if (file) {
            file.path = `courses/${course.id}/images/`;
        }

        getData(data => onSubmit(Object.assign(data, { file })));
        fileInputRef.current.reset();
    }, []);

    return (
        <Form id="course-form" onSubmit={handleSubmit}>
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

                <TextField
                    name="description"
                    label="Описание"
                    value={data.description}
                    filled
                    textarea
                    onChange={handleChange}
                />

                <FileInput
                    ref={fileInputRef}
                    name="file"
                    label="Изображение"
                    url={data.image && STATIC_URL + course.imageUrl}
                    caption={data.image}
                />
            </Layout>
        </Form>
    );
}

CourseForm.defaultProps = {
    course: {
        title: '',
        slug: '',
        description: '',
        image: ''
    }
};