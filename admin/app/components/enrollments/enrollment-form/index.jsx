import React, { forwardRef, useRef, useCallback, useImperativeHandle } from 'react';
import {
    Layout,
    Select,
    TextField
} from 'mdc-react';

import {
    defaultEnrollment, domainOptions, typeOptions, formatOptions,
    ageOptions, teacherTypeOptions, levelOptions, purposeOptions
} from 'shared/data/enrollment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import ScheduleSelect from 'shared/components/schedule-select';
import DateTimeSelect from 'shared/components/datetime-select';
import PeopleSelect from 'shared/components/people-select';

import { useStore } from 'app/hooks/store';

import './index.scss';

export default forwardRef(EnrollmentForm);

function EnrollmentForm({ enrollment = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    const [teachers] = useStore('teachers.list');
    const [managers] = useStore('managers.list');

    const [data, handleChange] = useForm({
        ...defaultEnrollment,
        ...enrollment,
        client: enrollment.client?.id || '',
        teachers: enrollment.teachers?.map(t => t.id || t),
        managers: enrollment.managers?.map(m => m.id || m),
        courses: undefined,
        lessons: undefined,
        payments: undefined
    });

    console.log(data);

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
                    name="domain"
                    value={data.domain}
                    label="Направление"
                    options={domainOptions}
                    filled
                    required
                    onChange={handleChange}
                />

                <Select
                    name="type"
                    value={data.type}
                    label="Тип"
                    options={typeOptions}
                    filled
                    required
                    onChange={handleChange}
                />

                <Select
                    name="format"
                    value={data.format}
                    label="Формат"
                    options={formatOptions}
                    filled
                    required
                    onChange={handleChange}
                />

                <Select
                    name="age"
                    value={data.age}
                    label="Возрастная группа"
                    options={ageOptions}
                    filled
                    onChange={handleChange}
                />

                <Select
                    name="teacherType"
                    value={data.teacherType}
                    label="Тип преподавателя"
                    options={teacherTypeOptions}
                    filled
                    onChange={handleChange}
                />

                <TextField
                    type="number"
                    name="lessonDuration"
                    value={data.lessonDuration}
                    label="Продолжительность урока"
                    filled
                    onChange={handleChange}
                />

                <Select
                    name="level"
                    value={data.level}
                    label="Уровень"
                    options={levelOptions}
                    filled
                    onChange={handleChange}
                />

                <Select
                    name="purpose"
                    value={data.purpose}
                    label="Цель"
                    options={purposeOptions}
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
                    items={data.trialLessonSchedule}
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

                {enrollment.id &&
                    <>
                        <PeopleSelect
                            name="managers"
                            value={data.managers}
                            label="Менеджеры"
                            options={managers.map(manager => ({
                                key: manager.id,
                                value: manager.id,
                                text: manager.fullname
                            }))}
                            multiple
                            onChange={handleChange}
                        />

                        <PeopleSelect
                            name="teachers"
                            value={data.teachers}
                            label="Преподаватели"
                            options={teachers.map(teacher => ({
                                key: teacher.id,
                                value: teacher.id,
                                text: teacher.fullname
                            }))}
                            multiple
                            onChange={handleChange}
                        />
                    </>
                }
            </Layout>
        </Form >
    );
}