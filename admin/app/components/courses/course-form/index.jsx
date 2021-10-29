import { useCallback, useRef } from 'react';
import {
    Layout,
    LayoutGrid,
    TextField
} from 'mdc-react';

import { slugify } from 'shared/utils/format';
import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FileInput from 'shared/components/file-input';

export default function CourseForm({ course = {}, onSubmit, ...props }) {
    const fileInputRef = useRef();
    const [data, handleChange, getData, setData] = useForm({
        title: course.title,
        slug: course.slug,
        description: course.description,
        image: course.image
    }, [course]);

    const handleSubmit = useCallback(() => {
        const file = fileInputRef.current.input.files[0];

        if (file) {
            file.path = `courses/${course.id}/images/`;
        }

        getData(data => onSubmit(Object.assign(data, { file })));
        fileInputRef.current.reset();
    }, [course]);

    const handleTitleBlur = useCallback(() => {
        setData(data => ({ ...data, slug: slugify(data.title) }));
    }, [data.title]);

    return (
        <Form onSubmit={handleSubmit} {...props}>
            <LayoutGrid>
                <LayoutGrid.Cell span="4">
                    <Layout column>
                        <TextField
                            name="title"
                            label="Название"
                            value={data.title}
                            outlined
                            onChange={handleChange}
                            onBlur={handleTitleBlur}
                        />

                        <TextField
                            name="slug"
                            label="Слаг"
                            value={data.slug}
                            outlined
                            onChange={handleChange}
                        />

                        <FileInput
                            ref={fileInputRef}
                            name="file"
                            label="Изображение"
                            url={data.image && course.imageUrl}
                            caption={data.image}
                        />
                    </Layout>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="8">
                    <TextField
                        name="description"
                        label="Описание"
                        value={data.description}
                        outlined
                        textarea
                        onChange={handleChange}
                    />
                </LayoutGrid.Cell>
            </LayoutGrid>
        </Form>
    );
}