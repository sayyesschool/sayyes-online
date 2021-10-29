import { useCallback, useRef } from 'react';
import {
    LayoutGrid,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import AudioField from 'shared/components/audio-field';
import TextEditor from 'shared/components/text-editor';

const defaultAudio = {
    title: '',
    duration: 0,
    filename: '',
    script: ''
};

export default function AudioForm({ audio = {}, path, onSubmit, ...props }) {
    const textEditorRef = useRef();
    const fileInputRef = useRef();

    const [data, handleChange, getData] = useForm({
        ...defaultAudio,
        ...audio
    }, [audio.id]);

    const handleSubmit = useCallback(() => {
        getData(data => {
            const file = fileInputRef.current.file;
            const script = textEditorRef.current.editor.getData();
            console.log(script);
            if (file) {
                file.path = path;
            }

            data.script = script;

            onSubmit(data, file);

            return data;
        });
    }, [path]);

    return (
        <Form className="audio-form" onSubmit={handleSubmit} {...props}>
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
                        type="number"
                        name="duration"
                        label="Продолжительность"
                        value={data.duration}
                        suffix="сек."
                        min="0"
                        outlined
                        onChange={handleChange}
                    />

                    <AudioField
                        ref={fileInputRef}
                        name="file"
                        label="Файл"
                        filename={data.filename}
                        url={audio.url}
                    />
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="8">
                    <TextEditor
                        ref={textEditorRef}
                        defaultValue={data.script}
                    />
                </LayoutGrid.Cell>
            </LayoutGrid>
        </Form>
    );
}