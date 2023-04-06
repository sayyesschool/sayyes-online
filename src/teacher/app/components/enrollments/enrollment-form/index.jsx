import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { useFormData } from 'shared/hooks/form';
import Form from 'shared/ui-components/form';
import ScheduleSelect from 'shared/components/schedule-select';
import DateTimeSelect from 'shared/components/datetime-select';
import PeopleSelect from 'shared/components/people-select';
import {
    defaultEnrollment, domainOptions, typeOptions, formatOptions,
    ageOptions, teacherTypeOptions, levelOptions, purposeOptions
} from 'shared/data/enrollment';

function EnrollmentForm({
    enrollment = {},
    onSubmit,
    ...props
}, ref) {
    const formRef = useRef();

    const { data, handleChange } = useFormData({
        ...defaultEnrollment,
        ...enrollment,
        client: enrollment.client?.id || '',
        teachers: enrollment.teachers.map(t => t.id || t),
        managers: enrollment.managers.map(m => m.id || m),
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
                name="age"
                value={data.age}
                options={ageOptions}
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
                type="number"
                name="lessonDuration"
                value={data.lessonDuration}
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

            <Form.Input
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

            <DateTimeSelect
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
            />

            <Form.Textarea
                label="Примечание"
                name="note"
                value={data.note}
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
        </Form>
    );
}

export default forwardRef(EnrollmentForm);