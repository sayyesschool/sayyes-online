import React, { useCallback, useEffect, useState } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';
import moment from 'moment';

import { scheduleLessons } from 'shared/utils/enrollment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import LessonChipSet from 'shared/components/lesson-chip-set';

import './index.scss';

export default function LessonsForm({ enrollment, onSubmit, ...props }) {
    const [lessons, setLessons] = useState([]);

    const [data, handleChange] = useForm({
        quantity: 0,
        duration: enrollment.lessonDuration,
        startDate: new Date()
    });

    useEffect(() => {
        const lessons = scheduleLessons({
            schedule: enrollment.schedule,
            quantity: data.quantity,
            duration: data.duration,
            startDate: data.startDate
        });

        setLessons(lessons);
    }, [enrollment, data]);

    const handleSubmit = useCallback(() => {
        onSubmit(lessons);
    }, [lessons]);

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
                    value={data.duration}
                    label="Продолжительность"
                    suffix="мин."
                    step={5}
                    filled
                    onChange={handleChange}
                />

                <TextField
                    type="date"
                    name="startDate"
                    value={moment(data.startDate).format('YYYY-MM-DD')}
                    label="Начальная дата"
                    filled
                    onChange={handleChange}
                />

                <LessonChipSet
                    lessons={lessons}
                />
            </Layout>
        </Form>
    );
}