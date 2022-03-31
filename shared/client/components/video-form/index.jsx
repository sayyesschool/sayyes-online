import { useCallback, useRef } from 'react';
import {
    Form, FormInput
} from '@fluentui/react-northstar';

import useForm from 'shared/hooks/form';
import FormField from 'shared/components/form-field';
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

    const [data, handleChange, getData] = useForm({
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
            <FormInput
                name="title"
                label="Название"
                value={data.title}
                fluid
                onChange={handleChange}
            />

            <FormInput
                type="number"
                name="duration"
                label="Продолжительность"
                value={data.duration}
                suffix="сек."
                min="0"
                fluid
                onChange={handleChange}
            />

            <FormField label="Скрипт">
                <TextEditor
                    ref={textEditorRef}
                    defaultValue={data.script}
                />
            </FormField>
        </Form>
    );
}