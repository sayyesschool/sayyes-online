import React, { useRef, useCallback } from 'react';
import {
    Layout,
    Select,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FileInput from 'shared/components/file-input';

export default function ExerciseForm({ exercise = {}, course, onSubmit }) {
    const fileInputRef = useRef();
    const [data, handleChange, getData] = useForm({
        description: exercise.description,
        image: exercise.image,
        audio: exercise.audio,
        video: exercise.video
    }, [exercise]);

    const handleSubmit = useCallback(() => {
        const file = fileInputRef.current.input.files[0];

        if (file) {
            file.path = `courses/${course.id}/images/`;
        }

        getData(data => onSubmit(Object.assign(data, { file })));
        fileInputRef.current.reset();
    }, [onSubmit]);

    return (
        <Form id="exercise-form" onSubmit={handleSubmit}>
            <Layout column>
                <TextField
                    name="description"
                    label="Описание"
                    value={data.description}
                    filled
                    textarea
                    onChange={handleChange}
                />

                <Select
                    name="audio"
                    label="Аудио"
                    value={data.audio}
                    options={course.audios.map(audio => ({
                        key: audio.filename,
                        value: audio.filename,
                        text: audio.title
                    }))}
                    filled
                    onChange={handleChange}
                />

                <Select
                    name="video"
                    label="Видео"
                    value={data.video}
                    options={course.videos.map(video => ({
                        key: video.filename,
                        value: video.filename,
                        text: video.title
                    }))}
                    filled
                    onChange={handleChange}
                />

                <FileInput
                    ref={fileInputRef}
                    name="image"
                    label="Изображение"
                />
            </Layout>
        </Form>
    );
}

ExerciseForm.defaultProps = {
    exercise: {
        description: '',
        image: '',
        audio: '',
        video: ''
    }
};