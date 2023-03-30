import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import { scheduleLessons } from 'shared/libs/enrollment';
import { useFormData } from 'shared/hooks/form';
import UserSelect from 'shared/components/user-select';
import LessonsPillGroup from 'shared/components/lessons-pill-group';
import { Form } from 'shared/ui-components';

import { useStore } from 'app/hooks/store';

import './index.scss';

export default function LessonsForm({ enrollment, onSubmit, ...props }) {
    const [teachers] = useStore('teachers.list');

    const [lessons, setLessons] = useState([]);

    const { data, handleChange } = useFormData({
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
        <Form className="sy-LessonsForm" onSubmit={handleSubmit} {...props}>
            <Form.Input
                label="Начальная дата"
                type="date"
                name="startDate"
                value={moment(data.startDate).format('YYYY-MM-DD')}
                onChange={handleChange}
            />

            <Form.Input
                label="Количество"
                type="number"
                name="quantity"
                value={data.quantity}
                onChange={handleChange}
            />

            <Form.Input
                label="Продолжительность"
                type="number"
                name="duration"
                value={data.duration}
                suffix="мин."
                step={5}
                onChange={handleChange}
            />

            <UserSelect
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

            <LessonsPillGroup
                lessons={lessons}
            />
        </Form>
    );
}