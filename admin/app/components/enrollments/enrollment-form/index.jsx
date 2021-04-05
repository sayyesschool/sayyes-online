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

import './index.scss';

const types = [
    { key: 'null', value: '', text: '' },
    { key: 'individual', value: 'individual', text: 'Индивидуально' },
    { key: 'group', value: 'group', text: 'Группа' }
];

const formats = [
    { key: 'null', value: '', text: '' },
    { key: 'online', value: 'online', text: 'Онлайн' },
    { key: 'offline', value: 'offline', text: 'Оффлайн' }
];

const ages = [
    { key: 'null', value: '', text: '' },
    { key: 'adults', value: 'adults', text: 'Взрослые' },
    { key: 'teenagers', value: 'teenagers', text: 'Подростки' },
    { key: 'children', value: 'children', text: 'Дети' }
];

const levels = [
    { key: 'null', value: '', text: '' },
    { key: 'zero', value: 'zero', text: 'Нулевой' },
    { key: 'beg', value: 'beg', text: 'Beginner' },
    { key: 'elem', value: 'elem', text: 'Elementary' },
    { key: 'pre', value: 'pre', text: 'Pre-Intermediate' },
    { key: 'int', value: 'int', text: 'Intermediate' },
    { key: 'upper', value: 'upper', text: 'Upper-Intermediate' },
    { key: 'adv', value: 'adv', text: 'Advanced' }
];

const purposes = [
    { key: 'null', value: '', text: '' },
    { key: 'work', value: 'work', text: 'Для работы' },
    { key: 'study', value: 'study', text: 'Для учебы' },
    { key: 'interview', value: 'interview', text: 'Для собеседования' },
    { key: 'travel', value: 'travel', text: 'Для путешествий' },
    { key: 'hobby', value: 'hobby', text: 'Для себя (хобби)' }
];

const defaultEnrollment = {
    status: 'pending',
    domain: 'general',
    type: '',
    format: '',
    age: '',
    level: '',
    experience: '',
    purpose: '',
    preferences: '',
    trialLesson: [],
    schedule: [],
    note: '',
};

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