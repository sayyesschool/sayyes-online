import { useCallback, useRef } from 'react';

import useForm from 'shared/hooks/form';
import Form from 'shared/ui-components/form';
import TextEditor from 'shared/components/text-editor';

const defaultVideo = {
    title: '',
    duration: 0,
    filename: '',
    script: ''
};

export default function VideoForm({ video = {}, path, onSubmit, ...props }) {
    const textEditorRef = useRef();
    const fileInputRef = useRef();

    const { data, handleChange, getData } = useForm({
        ...defaultVideo,
        ...video
    }, [video.id]);

    const handleSubmit = useCallback(() => {
        getData(data => {
            const file = fileInputRef.current.file;
            const script = textEditorRef.current.editor.getData();

            if (file) {
                file.path = path;
            }

            data.script = script;

            onSubmit(data, file);

            return data;
        });
    }, [path]);

    return (
        <Form className="video-form" onSubmit={handleSubmit} {...props}>
            <Form.Input
                name="title"
                label="Название"
                value={data.title}
                fluid
                onChange={handleChange}
            />

            <Form.Input
                type="number"
                name="duration"
                label="Продолжительность"
                value={data.duration}
                suffix="сек."
                min="0"
                fluid
                onChange={handleChange}
            />

            <Form.Field label="Скрипт">
                <TextEditor
                    ref={textEditorRef}
                    defaultValue={data.script}
                />
            </Form.Field>
        </Form>
    );
}