import { useCallback, useEffect, useState } from 'react';

import LessonsPillGroup from 'shared/components/lessons-pill-group';
import UserSelect from 'shared/components/user-select';
import { useFormData } from 'shared/hooks/form';
import datetime from 'shared/libs/datetime';
import { scheduleLessons } from 'shared/libs/enrollment';
import { Form, Text } from 'shared/ui-components';

import { useStore } from 'crm/hooks/store';

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
        <Form
            className="LessonsForm" onSubmit={handleSubmit}
            {...props}
        >
            <Text>{enrollment.scheduleLabel}</Text>

            <Form.Input
                label="Начальная дата"
                type="date"
                name="startDate"
                value={datetime(data.startDate).format('YYYY-MM-DD')}
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
                label="Продолжительность, мин"
                type="number"
                name="duration"
                value={data.duration}
                step={5}
                onChange={handleChange}
            />

            <UserSelect
                label="Преподаватель"
                name="teacher"
                value={data.teacher}
                options={teachers.map(teacher => ({
                    key: teacher.id,
                    value: teacher.id,
                    label: teacher.fullname,
                    content: teacher.fullname
                }))}
                onChange={handleChange}
            />

            <LessonsPillGroup
                lessons={lessons}
            />
        </Form>
    );
}