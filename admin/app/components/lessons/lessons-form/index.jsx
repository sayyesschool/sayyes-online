import React, { useCallback } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import PeopleSelect from 'shared/components/people-select';

import { useStore } from 'app/hooks/store';

import './index.scss';

export default function LessonsForm({ client = '', teacher = '', onSubmit, ...props }) {
    const [teachers] = useStore('teachers.list');

    const [data, handleChange] = useForm({
        quantity: 0,
        duration: 50,
        teacher: ''
    });

    const handleSubmit = useCallback(() => {
        const lessons = new Array(Number(data.quantity)).fill({
            date: null,
            duration: data.duration,
            client: data.client,
            teacher: data.teacher
        });

        onSubmit(lessons);
    }, [data]);

    return (
        <Form className="lessons-form" onSubmit={handleSubmit} {...props}>
            <Layout column>
                <TextField
                    type="number"
                    name="quantity"
                    value={data.quantity}
                    label="Количество"
                    filled
                    onChange={handleChange}
                />

                <TextField
                    type="number"
                    name="duration"
                    step="5"
                    value={data.duration}
                    label="Продолжительность"
                    suffix="мин."
                    filled
                    onChange={handleChange}
                />

                <PeopleSelect
                    name="teacher"
                    value={data.teacher}
                    label="Преподаватель"
                    options={teachers.map(teacher => ({
                        key: teacher?.id,
                        value: teacher?.id,
                        text: teacher?.fullname
                    }))}
                    onChange={handleChange}
                />
            </Layout>
        </Form>
    );
}