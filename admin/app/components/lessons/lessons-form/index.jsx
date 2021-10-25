import { useCallback, useEffect, useState } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';
import moment from 'moment';

import { scheduleLessons } from 'shared/libs/enrollment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import PeopleSelect from 'shared/components/people-select';
import LessonChipSet from 'shared/components/lesson-chip-set';

import { useStore } from 'app/hooks/store';

import './index.scss';

export default function LessonsForm({ enrollment, onSubmit, ...props }) {
    const [teachers] = useStore('teachers.list');

    const [lessons, setLessons] = useState([]);

    const [data, handleChange] = useForm({
        quantity: 0,
        startDate: new Date(),
        duration: enrollment.lessonDuration,
        teacher: enrollment.teacher?.id || ''
    });

    useEffect(() => {
        const lessons = scheduleLessons({
            schedule: enrollment.schedule,
            startDate: data.startDate,
            quantity: data.quantity,
            duration: data.duration,
            teacher: data.teacher
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
                    type="date"
                    name="startDate"
                    value={moment(data.startDate).format('YYYY-MM-DD')}
                    label="Начальная дата"
                    filled
                    onChange={handleChange}
                />

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

                <LessonChipSet
                    lessons={lessons}
                />
            </Layout>
        </Form>
    );
}