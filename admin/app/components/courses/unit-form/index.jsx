import React, { useRef, useCallback } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FileInput from 'shared/components/file-input';

export default function UnitForm({ unit = {}, onSubmit }) {
    const fileInputRef = useRef();
    const [data, handleChange, getData] = useForm({
        title: unit.title,
        slug: unit.slug,
        description: unit.description,
        image: unit.image
    }, [unit]);

    const handleSubmit = useCallback(() => {
        const file = fileInputRef.current.files[0];

        getData(data => onSubmit(Object.assign(data, { file })));
    }, [onSubmit]);

    return (
        <Form id="unit-form" onSubmit={handleSubmit}>
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
                    name="image"
                    label="Изображение"
                />
            </Layout>
        </Form>
    );
}

UnitForm.defaultProps = {
    unit: {
        title: '',
        slug: '',
        description: '',
        image: ''
    }
};