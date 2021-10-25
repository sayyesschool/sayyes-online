import { useCallback, useRef } from 'react';
import {
    LayoutGrid,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FileInput from 'shared/components/file-input';
import TextEditor from 'shared/components/text-editor';

const defaultUnit = {
    title: '',
    slug: '',
    description: '',
    document: '',
    image: ''
};

export default function UnitForm({ unit = {}, onSubmit }) {
    const fileInputRef = useRef();
    const editorRef = useRef();

    const [data, handleChange, getData] = useForm(Object.assign(defaultUnit, unit), [unit.id]);

    const handleSubmit = useCallback(() => {
        const content = editorRef.current.editor.getData();
        const file = fileInputRef.current.input.files[0];

        data.content = content;

        getData(data => onSubmit(data, file));

        fileInputRef.current.reset();
    }, [onSubmit]);

    return (
        <Form className="unit-form" onSubmit={handleSubmit}>
            <LayoutGrid>
                <LayoutGrid.Cell span="4">
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
                        name="document"
                        label="Документ"
                        value={data.document}
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
                        name="file"
                        label="Изображение"
                        url={data.image && unit.imageUrl}
                        caption={data.image}
                    />
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="8">
                    <TextEditor
                        ref={editorRef}
                        defaultValue={unit.content}
                    />
                </LayoutGrid.Cell>
            </LayoutGrid>
        </Form>
    );
}