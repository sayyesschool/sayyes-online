import { useCallback, useRef } from 'react';
import {
    LayoutGrid,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import ImageField from 'shared/components/image-field';
import TextEditor from 'shared/components/text-editor';

const defaultLesson = {
    title: '',
    slug: '',
    description: '',
    document: '',
    image: ''
};

export default function LessonForm({ lesson = {}, onSubmit }) {
    const imageFieldRef = useRef();
    const editorRef = useRef();

    const [data, handleChange, getData] = useForm(Object.assign(defaultLesson, lesson), [lesson.id]);

    const handleSubmit = useCallback(() => {
        const content = editorRef.current.editor.getData();
        const file = imageFieldRef.current.input.files[0];

        data.content = content;

        getData(data => onSubmit(data, file));

        imageFieldRef.current.reset();
    }, [onSubmit]);

    return (
        <Form id="lesson-form" onSubmit={handleSubmit}>
            <LayoutGrid>
                <LayoutGrid.Cell span="4">
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

                    <ImageField
                        ref={imageFieldRef}
                        name="image"
                        label="Изображение"
                    />
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="8">
                    <TextEditor
                        ref={editorRef}
                        defaultValue={lesson.content}
                    />
                </LayoutGrid.Cell>
            </LayoutGrid>
        </Form>
    );
}