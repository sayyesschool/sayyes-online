import { useCallback } from 'react';

import { useForm } from 'shared/hooks/form';
import Form from 'shared/ui-components/form';
import { slugify } from 'shared/utils/format';

const defaultUnit = {
    title: ''
};

export default function UnitForm({ unit = defaultUnit, onSubmit, ...props }) {
    const { data, setValues, handleChange, handleSubmit } = useForm({
        values: {
            'title*': unit.title
        },
        onSubmit
    }, [unit.updatedAt]);

    const handleTitleBlur = useCallback(() => {
        setValues(({ title }) => ({ slug: slugify(title) }));
    }, []);

    return (
        <Form className="UnitForm" onSubmit={handleSubmit} {...props}>
            <Form.Input
                {...data.title}
                label="Название"
                onChange={handleChange}
                onBlur={handleTitleBlur}
            />
        </Form>
    );
}