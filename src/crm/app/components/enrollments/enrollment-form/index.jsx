import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { useFormData } from 'shared/hooks/form';
// import ScheduleSelect from 'shared/components/schedule-select';
// import DateTimeSelect from 'shared/components/datetime-select';
import UserSelect from 'shared/components/user-select';
import { Form } from 'shared/ui-components';
import {
    domainOptions,
    formatOptions,
    ageOptions,
    teacherTypeOptions,
    levelOptions,
    purposeOptions
} from 'shared/data/common';
import { typeOptions } from 'shared/data/enrollment';

import { useStore } from 'app/store';

const defaultEnrollment = {
    status: 'processing',
    domain: 'general',
    type: '',
    format: '',
    age: '',
    teacherType: '',
    level: '',
    purpose: '',
    experience: '',
    preferences: '',
    lessonDuration: 50,
    trialLessonSchedule: [],
    schedule: [],
    note: '',
    teachers: [],
    managers: []
};

function EnrollmentForm({ enrollment = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    const [managers] = useStore('managers.list');
    const [teachers] = useStore('teachers.list');

    const { data, handleChange } = useFormData({
        ...defaultEnrollment,
        ...enrollment,
        client: enrollment.client?.id || '',
        teachers: enrollment.teachers?.map(t => t.id || t),
        managers: enrollment.managers?.map(m => m.id || m),
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

    const managersMap = new Map(managers.map(manager => [manager.id, manager]));
    const teachersMap = new Map(teachers.map(teacher => [teacher.id, teacher]));

    return (
        <Form ref={formRef} className="EnrollmentForm" onSubmit={handleSubmit} {...props}>
            <Form.Select
                name="domain"
                value={data.domain}
                label="Направление"
                options={domainOptions}
                required
                onChange={handleChange}
            />

            <Form.Select
                name="type"
                value={data.type}
                label="Тип"
                options={typeOptions}
                required
                onChange={handleChange}
            />

            <Form.Select
                name="format"
                value={data.format}
                label="Формат"
                options={formatOptions}
                required
                onChange={handleChange}
            />

            <Form.Select
                name="age"
                value={data.age}
                label="Возрастная группа"
                options={ageOptions}
                onChange={handleChange}
            />

            <Form.Select
                name="teacherType"
                value={data.teacherType}
                label="Тип преподавателя"
                options={teacherTypeOptions}
                onChange={handleChange}
            />

            <Form.Input
                type="number"
                name="lessonDuration"
                value={data.lessonDuration}
                label="Продолжительность урока"
                onChange={handleChange}
            />

            <Form.Select
                name="level"
                value={data.level}
                label="Уровень"
                options={levelOptions}
                onChange={handleChange}
            />

            <Form.Select
                name="purpose"
                value={data.purpose}
                label="Цель"
                options={purposeOptions}
                onChange={handleChange}
            />

            <Form.Textarea
                name="experience"
                value={data.experience}
                label="Опыт"
                onChange={handleChange}
            />

            <Form.Textarea
                name="preferences"
                value={data.preferences}
                label="Пожелания"
                onChange={handleChange}
            />

            {/* <DateTimeSelect
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
            /> */}

            <Form.Textarea
                name="note"
                value={data.note}
                label="Примечание"
                onChange={handleChange}
            />

            {enrollment.id &&
                <>
                    <UserSelect
                        name="managers"
                        value={data.managers}
                        label="Менеджеры"
                        options={managers.map(manager => ({
                            key: manager.id,
                            value: manager.id,
                            label: manager.fullname
                        }))}
                        multiple
                        onChange={handleChange}
                    />

                    <UserSelect
                        name="teachers"
                        value={data.teachers}
                        label="Преподаватели"
                        options={teachers.map(teacher => ({
                            key: teacher.id,
                            value: teacher.id,
                            label: teacher.fullname
                        }))}
                        multiple
                        onChange={handleChange}
                    />
                </>
            }
        </Form>
    );
}

export default forwardRef(EnrollmentForm);