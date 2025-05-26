import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { EnrollmentStatus } from 'core/models/enrollment/constants';

// import ScheduleSelect from 'shared/components/schedule-select';
// import DateTimeSelect from 'shared/components/datetime-select';
import UserSelect from 'shared/components/user-select';
import {
    ageGroupOptions,
    domainOptions,
    formatOptions,
    levelOptions,
    purposeOptions,
    teacherTypeOptions
} from 'shared/data/common';
import { typeOptions } from 'shared/data/enrollment';
import { useFormData } from 'shared/hooks/form';
import { Form } from 'shared/ui-components';

import { useStore } from 'crm/store';

const getFormData = ({
    status = EnrollmentStatus.Processing,
    domain = '',
    type = '',
    format = '',
    ageGroup = '',
    level = 0,
    teacherType = '',
    lessonDuration = 50,
    schedule = [],
    trialLessonSchedule = [],
    info = {
        purpose: '',
        experience: '',
        preferences: '',
        note: ''
    },
    learnerId = '',
    managerId = null,
    teacherId = null
}) => ({
    status,
    domain,
    type,
    format,
    ageGroup,
    teacherType,
    level: String(level),
    lessonDuration,
    schedule,
    trialLessonSchedule,
    purpose: info.purpose,
    experience: info.experience,
    preferences: info.preferences,
    note: info.note,
    learnerId,
    managerId,
    teacherId
});

function EnrollmentForm({ enrollment = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    const [managers] = useStore('managers.list');
    const [teachers] = useStore('teachers.list');

    const { data, handleChange } = useFormData(
        getFormData(enrollment),
        [enrollment.updateAt]
    );

    console.log('EnrollmentForm', enrollment, data);

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    const handleSubmit = useCallback(() => {
        onSubmit({
            ...data,
            managerId: data.managerId || null,
            teacherId: data.teacherId || null,
            level: Number(data.level)
        });
    }, [data, onSubmit]);

    const managersMap = new Map(managers.map(manager => [manager.id, manager]));
    const teachersMap = new Map(teachers.map(teacher => [teacher.id, teacher]));

    return (
        <Form
            ref={formRef}
            className="EnrollmentForm"
            onSubmit={handleSubmit}
            {...props}
        >
            <Form.Select
                label="Направление"
                name="domain"
                value={data.domain}
                options={domainOptions}
                required
                onChange={handleChange}
            />

            <Form.Select
                label="Тип"
                name="type"
                value={data.type}
                options={typeOptions}
                required
                onChange={handleChange}
            />

            <Form.Select
                label="Формат"
                name="format"
                value={data.format}
                options={formatOptions}
                required
                onChange={handleChange}
            />

            <Form.Select
                label="Возрастная группа"
                name="ageGroup"
                value={data.ageGroup}
                options={ageGroupOptions}
                onChange={handleChange}
            />

            <Form.Select
                label="Тип преподавателя"
                name="teacherType"
                value={data.teacherType}
                options={teacherTypeOptions}
                onChange={handleChange}
            />

            <Form.Input
                label="Продолжительность урока"
                name="lessonDuration"
                value={data.lessonDuration}
                type="number"
                onChange={handleChange}
            />

            <Form.Select
                label="Уровень"
                name="level"
                value={data.level}
                options={levelOptions}
                onChange={handleChange}
            />

            <Form.Select
                label="Цель"
                name="purpose"
                value={data.purpose}
                options={purposeOptions}
                onChange={handleChange}
            />

            <Form.Textarea
                label="Опыт"
                name="experience"
                value={data.experience}
                onChange={handleChange}
            />

            <Form.Textarea
                label="Пожелания"
                name="preferences"
                value={data.preferences}
                onChange={handleChange}
            />

            {/* <DateTimeSelect
                label="Пробный урок"
                name="trialLesson"
                items={data.trialLessonSchedule}
                onChange={handleChange}
            />

            <ScheduleSelect
                label="Расписание"
                name="schedule"
                schedule={data.schedule}
                onChange={handleChange}
            /> */}

            <Form.Textarea
                label="Примечание"
                name="note"
                value={data.note}
                onChange={handleChange}
            />

            {enrollment.id &&
                <>
                    <UserSelect
                        label="Менеджеры"
                        name="managerId"
                        value={data.managerId}
                        options={managers.map(manager => ({
                            key: manager.id,
                            value: manager.id,
                            label: manager.fullname
                        }))}
                        onChange={handleChange}
                    />

                    <UserSelect
                        label="Преподаватели"
                        name="teacherId"
                        value={data.teacherId}
                        options={teachers.map(teacher => ({
                            key: teacher.id,
                            value: teacher.id,
                            label: teacher.fullname
                        }))}
                        onChange={handleChange}
                    />
                </>
            }
        </Form>
    );
}

export default forwardRef(EnrollmentForm);