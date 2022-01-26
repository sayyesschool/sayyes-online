import { useCallback, useRef } from 'react';
import {
    FormField,
    Layout,
    Select, SelectOption,
    Switch,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import ImageField from 'shared/components/image-field';

export default function MaterialForm({ material = {}, onSubmit }) {
    const imageFieldRef = useRef();
    const [data, setData] = useForm({
        title: material.title,
        slug: material.slug,
        level: material.level,
        published: material.published,
        image: material.image
    });

    const handleSubmit = useCallback(() => {
        const file = imageFieldRef.current.input.files[0];

        if (file) {
            file.path = `materials/`;
        }

        getData(data => onSubmit(Object.assign(data, { file })));
        imageFieldRef.current.reset();
    }, []);

    return (
        <Form id="material-form" onSubmit={handleSubmit}>
            <Layout column>
                <TextField
                    name="title"
                    value={data.title}
                    label="Тема"
                    filled
                    required
                    onChange={setData}
                />

                <TextField
                    name="slug"
                    value={data.slug}
                    label="Слаг"
                    filled
                    required
                    onChange={setData}
                />

                <Select
                    name="level"
                    value={data.level}
                    label="Уровень"
                    filled
                    onChange={setData}
                >
                    {['Beginner', 'Elementary', 'Intermediate', 'Pre-Intermediate', 'Upper-Intermediate', 'Advanced'].map(level =>
                        <SelectOption
                            key={level}
                            value={level}
                        >
                            {level}
                        </SelectOption>
                    )}
                </Select>

                <FormField label="Опубликован">
                    <Switch
                        name="published"
                        checked={data.published}
                        onChange={setData}
                    />
                </FormField>

                <ImageField
                    ref={imageFieldRef}
                    name="file"
                    label="Изображение"
                    url={data.image && STATIC_URL + material.imageUrl}
                    caption={data.image}
                />
            </Layout>
        </Form>
    );
}

MaterialForm.defaultProps = {
    material: {
        title: '',
        slug: '',
        level: '',
        published: false,
        image: ''
    }
};