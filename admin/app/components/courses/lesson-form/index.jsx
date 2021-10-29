import { useCallback, useRef } from 'react';
import {
    LayoutGrid,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FileInput from 'shared/components/file-input';
import TextEditor from 'shared/components/text-editor';

const defaultLesson = {
    title: '',
    slug: '',
    description: '',
    document: '',
    image: ''
};

export default function LessonForm({ lesson = {}, onSubmit }) {
    const fileInputRef = useRef();
    const editorRef = useRef();

    const [data, handleChange, getData] = useForm(Object.assign(defaultLesson, lesson), [lesson.id]);

    const handleSubmit = useCallback(() => {
        const content = editorRef.current.editor.getData();
        const file = fileInputRef.current.input.files[0];

        data.content = content;

        getData(data => onSubmit(data, file));

        fileInputRef.current.reset();
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

                    <FileInput
                        ref={fileInputRef}
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