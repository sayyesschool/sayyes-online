import React, { useCallback } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

import './index.scss';

export default function CourseForm({ course = {}, onSubmit }) {
    const [data, handleChange, getData] = useForm({
        title: course.title,
        slug: course.slug
    }, [course]);

    const handleSubmit = useCallback(() => {
        getData(onSubmit);
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
            </Layout>
        </Form>
    );
}

CourseForm.defaultProps = {
    course: {
        title: '',
        slug: ''
    }
};