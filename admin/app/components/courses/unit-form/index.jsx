import { useCallback, useRef } from 'react';
import {
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import ImageField from 'shared/components/image-field';

const defaultUnit = {
    title: '',
    slug: '',
    description: '',
    document: '',
    image: ''
};

export default function UnitForm({ unit = {}, onSubmit, ...props }) {
    const fileInputRef = useRef();

    const [data, handleChange, getData] = useForm(Object.assign(defaultUnit, unit), [unit.id]);

    const handleSubmit = useCallback(() => {
        const file = fileInputRef.current.input.files[0];

        getData(data => onSubmit(data, file));

        fileInputRef.current.reset();
    }, [onSubmit]);

    return (
        <Form className="unit-form" onSubmit={handleSubmit} {...props}>
            <TextField
                name="title"
                label="Название"
                value={data.title}
                outlined
                onChange={handleChange}
            />

            <TextField
                name="slug"
                label="Слаг"
                value={data.slug}
                outlined
                onChange={handleChange}
            />

            <TextField
                name="document"
                label="Документ"
                value={data.document}
                outlined
                onChange={handleChange}
            />

            <TextField
                name="description"
                label="Описание"
                value={data.description}
                outlined
                textarea
                onChange={handleChange}
            />

            <ImageField
                ref={fileInputRef}
                name="file"
                label="Изображение"
                url={data.image && unit.imageUrl}
                caption={data.image}
            />
        </Form>
    );
}