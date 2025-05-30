import { useCallback, useRef } from 'react';

import ImageField from 'shared/components/image-field';
import { STATIC_URL } from 'shared/constants';
import { levelOptions } from 'shared/data/common';
import useForm from 'shared/hooks/form';
import Form from 'shared/ui-components/form';

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

    const { data, setData, getData } = useForm(getDefaultData(material), [material.id]);

    const handleSubmit = useCallback(() => {
        const file = imageFieldRef.current.input.files[0];

        if (file) {
            file.path = 'materials/';
        }

        getData(data => onSubmit(Object.assign(data, { file })));
        imageFieldRef.current.reset();
    }, [getData, onSubmit]);

    return (
        <Form
            className="MaterialForm"
            onSubmit={handleSubmit}
            {...props}
        >
            <Form.Input
                label="Тема"
                name="title"
                value={data.title}
                required
                onChange={setData}
            />

            <Form.Input
                label="Слаг"
                name="slug"
                value={data.slug}
                required
                onChange={setData}
            />

            <Form.Select
                label="Уровень"
                name="level"
                value={data.level}
                options={levelOptions}
                onChange={setData}
            />

            <Form.Checkbox
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