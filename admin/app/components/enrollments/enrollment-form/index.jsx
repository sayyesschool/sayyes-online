import React, { forwardRef, useRef, useCallback, useImperativeHandle } from 'react';
import {
    Layout,
    Select,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import ScheduleSelect from 'shared/components/schedule-select';
import DateTimeSelect from 'shared/components/datetime-select';
import PeopleSelect from 'shared/components/people-select';

import { useStore } from 'app/hooks/store';
import { statuses, types, formats, ages, levels, purposes, defaultEnrollment } from 'app/data/enrollment';

import './index.scss';

export default forwardRef(EnrollmentForm);

function EnrollmentForm({ enrollment = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    const [user] = useStore('user');
    const [teachers] = useStore('teachers.list');
    const [managers] = useStore('managers.list');

    const [data, handleChange] = useForm({
        ...defaultEnrollment,
        ...enrollment,
        client: enrollment.client?.id || '',
        teacher: enrollment.teacher?.id || '',
        manager: enrollment.manager?.id || user.id,
        courses: undefined,
        lessons: undefined,
        payments: undefined
    });

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    const handleSubmit = useCallback(() => {
        onSubmit(data);
    }, [data, onSubmit]);

    return (
        <Form ref={formRef} className="enrollment-form" onSubmit={handleSubmit} {...props}>
            <Layout column>
                <Select
                    name="status"
                    value={data.status}
                    label="Статус"
                    options={statuses}
                    filled
                    required
                    onChange={handleChange}
                />

                <Select
                    name="type"
                    value={data.type}
                    label="Тип"
                    options={types}
                    filled
                    required
                    onChange={handleChange}
                />

                <Select
                    name="format"
                    value={data.format}
                    label="Формат"
                    options={formats}
                    filled
                    required
                    onChange={handleChange}
                />

                <Select
                    name="age"
                    value={data.age}
                    label="Возрастная группа"
                    options={ages}
                    filled
                    onChange={handleChange}
                />

                <Select
                    name="level"
                    value={data.level}
                    label="Уровень"
                    options={levels}
                    filled
                    onChange={handleChange}
                />

                <Select
                    name="purpose"
                    value={data.purpose}
                    label="Цель"
                    options={purposes}
                    filled
                    onChange={handleChange}
                />

                <TextField
                    name="experience"
                    value={data.experience}
                    label="Опыт"
                    filled
                    textarea
                    onChange={handleChange}
                />

                <TextField
                    name="preferences"
                    value={data.preferences}
                    label="Пожелания"
                    filled
                    textarea
                    onChange={handleChange}
                />

                <DateTimeSelect
                    name="trialLesson"
                    label="Пробный урок"
                    items={data.trialLesson}
                    onChange={handleChange}
                />

                <ScheduleSelect
                    name="schedule"
                    label="Расписание"
                    schedule={data.schedule}
                    onChange={handleChange}
                />

                <TextField
                    name="note"
                    value={data.note}
                    label="Примечание"
                    filled
                    textarea
                    onChange={handleChange}
                />

                <PeopleSelect
                    name="teacher"
                    value={data.teacher}
                    label="Преподаватель"
                    options={teachers.map(teacher => ({
                        key: teacher.id,
                        value: teacher.id,
                        text: teacher.fullname
                    }))}
                    onChange={handleChange}
                />

                <PeopleSelect
                    name="manager"
                    value={data.manager}
                    label="Менеджер"
                    options={managers.map(manager => ({
                        key: manager.id,
                        value: manager.id,
                        text: manager.fullname
                    }))}
                    onChange={handleChange}
                />
            </Layout>
        </Form >
    );
}