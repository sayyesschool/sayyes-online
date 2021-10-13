import React, { createElement, useCallback } from 'react';
import {
    Layout,
    Select,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

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
    items: []
};

export default function ExerciseForm({ course, exercise = defaultExercise, onSubmit, ...props }) {
    const [data, handleChange, setData] = useForm(exercise);

    const handleSubmit = useCallback(() => {
        setData(data => {
            console.log(data);
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
            <Layout column>
                <Select
                    name="type"
                    label="Тип"
                    value={data.type}
                    options={typeOptions}
                    filled
                    onChange={handleChange}
                />

                <TextField
                    name="title"
                    label="Название"
                    value={data.title}
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

                {data.type && createElement(ComponentsByType[data.type], {
                    key: exercise.id,
                    exercise: data,
                    onUpdate: handleUpdate
                })}
            </Layout>
        </Form>
    );
}