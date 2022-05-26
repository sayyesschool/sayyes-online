import { useCallback, useRef } from 'react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FormCheckbox from 'shared/components/form-checkbox';
import FormInput from 'shared/components/form-input';
import FormSelect from 'shared/components/form-select';
import ImageField from 'shared/components/image-field';
import { levelOptions } from 'shared/data/levels';

const getDefaultData = ({
    title = '',
    slug = '',
    level = '',
    published = false,
    image = { src: '' }
}) => ({
    title,
    slug,
    level,
    published,
    image
});

export default function MaterialForm({ material = {}, onSubmit, ...props }) {
    const imageFieldRef = useRef();

    const { data, setData } = useForm(getDefaultData(material), [material.id]);

    const handleSubmit = useCallback(() => {
        const file = imageFieldRef.current.input.files[0];

        if (file) {
            file.path = `materials/`;
        }

        getData(data => onSubmit(Object.assign(data, { file })));
        imageFieldRef.current.reset();
    }, []);

    return (
        <Form className="material-form" onSubmit={handleSubmit} {...props}>
            <FormInput
                name="title"
                value={data.title}
                label="Тема"
                required
                onChange={setData}
            />

            <FormInput
                name="slug"
                value={data.slug}
                label="Слаг"
                required
                onChange={setData}
            />

            <FormSelect
                name="level"
                value={data.level}
                label="Уровень"
                options={levelOptions}
                onChange={setData}
            />

            <FormCheckbox
                label="Опубликован"
                name="published"
                checked={data.published}
                onChange={setData}

            />

            <ImageField
                ref={imageFieldRef}
                name="file"
                label="Изображение"
                url={data.image && STATIC_URL + material.imageUrl}
                caption={data.image}
            />
        </Form>
    );
}