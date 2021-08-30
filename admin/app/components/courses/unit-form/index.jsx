import React, { useRef, useCallback } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FileInput from 'shared/components/file-input';

const defaultUnit = {
    title: '',
    slug: '',
    description: '',
    document: '',
    image: ''
};

export default function UnitForm({ unit = defaultUnit, onSubmit }) {
    const fileInputRef = useRef();

    const [data, handleChange, getData] = useForm(unit, [unit]);

    const handleSubmit = useCallback(() => {
        const file = fileInputRef.current.input.files[0];

        if (file) {
            file.path = `courses/${unit.course.id}/images/`;
        }

        getData(data => onSubmit(Object.assign(data, { file })));

        fileInputRef.current.reset();
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

                <TextField
                    name="document"
                    label="Документ"
                    value={data.document}
                    filled
                    onChange={handleChange}
                />

                <FileInput
                    ref={fileInputRef}
                    name="file"
                    label="Изображение"
                    url={data.image && unit.imageUrl}
                    caption={data.image}
                />
            </Layout>
        </Form>
    );
}