import { useCallback } from 'react';

import { useForm } from 'shared/hooks/form';
import Form from 'shared/ui-components/form';
import { slugify } from 'shared/utils/format';

const defaultCourse = {
    title: '',
    slug: '',
    description: ''
};

export default function CourseForm({ course = defaultCourse, onSubmit, ...props }) {
    const { data, setData, handleChange, handleSubmit } = useForm({
        values: {
            'title*': course.title,
            'slug*': course.slug,
            description: course.description
        },
        onSubmit
    }, [course.updatedAt]);

    const handleTitleBlur = useCallback(() => {
        setData(data => ({ ...data, slug: slugify(data.title) }));
    }, []);

    return (
        <Form className="CourseForm" onSubmit={handleSubmit} {...props}>
            <Form.Input
                name="title"
                label="Название"
                value={data.title.value}
                required
                fluid
                onChange={handleChange}
                onBlur={handleTitleBlur}
            />

            <Form.Input
                name="slug"
                label="Слаг"
                value={data.slug.value}
                required
                fluid
                onChange={handleChange}
            />

            <Form.Textarea
                name="description"
                label="Описание"
                value={data.description.value}
                fluid
                onChange={handleChange}
            />
        </Form>
    );
}