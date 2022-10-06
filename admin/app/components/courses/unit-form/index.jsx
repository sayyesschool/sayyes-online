import { useCallback } from 'react';

import { useForm } from 'shared/hooks/form';
import Form from 'shared/components/form';
import { slugify } from 'shared/utils/format';

const defaultUnit = {
    title: '',
    slug: '',
    description: ''
};

export default function UnitForm({ unit = defaultUnit, onSubmit, ...props }) {
    const { data, setValues, handleChange, handleSubmit } = useForm({
        values: {
            'title*': unit.title,
            'slug*': unit.slug,
            description: unit.description
        },
        onSubmit
    }, [unit.updatedAt]);

    const handleTitleBlur = useCallback(() => {
        setValues(({ title }) => ({ slug: slugify(title) }));
    }, []);

    return (
        <Form className="unit-form" onSubmit={handleSubmit} {...props}>
            <Form.Input
                {...data.title}
                label="Название"
                fluid
                onChange={handleChange}
                onBlur={handleTitleBlur}
            />

            <Form.Input
                {...data.slug}
                label="Слаг"
                fluid
                onChange={handleChange}
            />

            <Form.Textarea
                {...data.description}
                label="Описание"
                fluid
                onChange={handleChange}
            />
        </Form>
    );
}