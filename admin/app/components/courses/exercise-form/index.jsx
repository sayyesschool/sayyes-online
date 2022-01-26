import { createElement, useCallback, useRef } from 'react';
import {
    Select,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import ImageField from 'shared/components/image-field';
import TextEditor from 'shared/components/text-editor';

import BooleanExerciseForm from './boolean-exercise-form';
import ChoiceExerciseForm from './choice-exercise-form';
import EssayExerciseForm from './essay-exercise-form';
import FIBExerciseForm from './fib-exercise-form';
import InputExerciseForm from './input-exercise-form';
import TextExerciseForm from './text-exercise-form';

import './index.scss';

const ComponentsByType = {
    boolean: BooleanExerciseForm,
    choice: ChoiceExerciseForm,
    essay: EssayExerciseForm,
    fib: FIBExerciseForm,
    input: InputExerciseForm,
    text: TextExerciseForm
};

const typeOptions = [
    {
        key: 'null',
        value: '',
        text: ''
    },
    {
        key: 'boolean',
        value: 'boolean',
        text: 'Да / Нет'
    },
    {
        key: 'choice',
        value: 'choice',
        text: 'Выбор'
    },
    {
        key: 'essay',
        value: 'essay',
        text: 'Эссе'
    },
    {
        key: 'fib',
        value: 'fib',
        text: 'Заполнить пробелы'
    },
    {
        key: 'input',
        value: 'input',
        text: 'Ввод'
    },
    {
        key: 'text',
        value: 'text',
        text: 'Текст'
    }
];

const defaultExercise = {
    type: '',
    title: '',
    description: '',
    text: '',
    image: '',
    audio: '',
    video: '',
    notes: '',
    items: []
};

export default function ExerciseForm({ course, exercise = defaultExercise, onSubmit, ...props }) {
    const textEditorRef = useRef();
    const imageFieldRef = useRef();

    const [data, handleChange, setData] = useForm({
        ...exercise,
        audio: exercise.audio?.id || exercise.audio
    }, [exercise.updatedAt]);

    const handleSubmit = useCallback(() => {
        setData(data => {
            const text = textEditorRef.current.editor.getData();

            data.text = text;

            onSubmit(data);
            return data;
        });
    }, [onSubmit]);

    const handleUpdate = useCallback(exercise => {
        setData(data => ({
            ...data,
            ...exercise
        }));
    }, [setData]);

    return (
        <Form id="exercise-form" className={`exercise-form exercise-form--${exercise.type}`} onSubmit={handleSubmit} {...props}>
            <Select
                name="type"
                label="Тип"
                value={data.type}
                options={typeOptions}
                outlined
                menuProps={{ modal: true }}
                onChange={handleChange}
            />

            <TextField
                name="title"
                label="Название"
                value={data.title}
                outlined
                onChange={handleChange}
            />

            <TextField
                name="description"
                label="Описание"
                value={data.description}
                textarea
                outlined
                autoResize
                onChange={handleChange}
            />

            <Select
                name="audio"
                label="Аудио"
                value={data.audio}
                options={[
                    {
                        key: 'null',
                        value: '',
                        text: ' '
                    },
                    ...course.audios.map(audio => ({
                        key: audio.id,
                        value: audio.id,
                        text: audio.title
                    }))
                ]}
                outlined
                menuProps={{ modal: true }}
                onChange={handleChange}
            />

            <Select
                name="video"
                label="Видео"
                value={data.video}
                options={[
                    {
                        key: 'null',
                        value: '',
                        text: ' '
                    },
                    ...course.videos.map(video => ({
                        key: video.filename,
                        value: video.filename,
                        text: video.title
                    }))
                ]}
                outlined
                menuProps={{ modal: true }}
                onChange={handleChange}
            />

            <ImageField
                ref={imageFieldRef}
                name="image"
                label="Изображение"
                url={data.image && exercise.imageUrl}
                caption={data.image}
            />

            <TextEditor
                ref={textEditorRef}
                value={data.text}
            />

            {data.type && createElement(ComponentsByType[data.type], {
                key: exercise.id,
                exercise: data,
                onUpdate: handleUpdate
            })}
        </Form>
    );
}