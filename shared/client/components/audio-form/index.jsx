import { useCallback, useRef } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import AudioField from 'shared/components/audio-field';

const defaultAudio = {
    title: '',
    duration: 0,
    filename: ''
};

export default function AudioForm({ audio = {}, path, onSubmit, ...props }) {
    const fileInputRef = useRef();

    const [data, handleChange, getData] = useForm({
        ...defaultAudio,
        ...audio
    }, [audio.id]);

    const handleSubmit = useCallback(() => {
        const file = fileInputRef.current.file;

        if (file) {
            file.path = path;
        }

        getData(data => {
            onSubmit(data, file);

            return data;
        });
    }, [path]);

    return (
        <Form className="audio-form" onSubmit={handleSubmit} {...props}>
            <Layout column>
                <TextField
                    name="title"
                    label="Название"
                    value={data.title}
                    filled
                    onChange={handleChange}
                />

                <TextField
                    type="number"
                    name="duration"
                    label="Продолжительность"
                    value={data.duration}
                    suffix="сек."
                    min="0"
                    filled
                    onChange={handleChange}
                />

                <AudioField
                    ref={fileInputRef}
                    name="file"
                    label="Файл"
                    filename={data.filename}
                    url={audio.url}
                />
            </Layout>
        </Form>
    );
}