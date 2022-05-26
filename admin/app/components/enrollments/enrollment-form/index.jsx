import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import Form from 'shared/components/form';
import FormInput from 'shared/components/form-input';
import FormSelect from 'shared/components/form-select';

import {
    defaultEnrollment, domainOptions, typeOptions, formatOptions,
    ageOptions, teacherTypeOptions, levelOptions, purposeOptions
} from 'shared/data/enrollment';

import useForm from 'shared/hooks/form';
// import ScheduleSelect from 'shared/components/schedule-select';
// import DateTimeSelect from 'shared/components/datetime-select';
import UserSelect from 'shared/components/user-select';

import { useStore } from 'app/hooks/store';

import './index.scss';

export default forwardRef(EnrollmentForm);

function EnrollmentForm({ enrollment = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    const [teachers] = useStore('teachers.list');
    const [managers] = useStore('managers.list');

    const { data, handleChange } = useForm({
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

    return (
        <Form ref={formRef} className="enrollment-form" onSubmit={handleSubmit} {...props}>
            <FormSelect
                name="domain"
                value={data.domain}
                label="Направление"
                options={domainOptions}
                fluid
                required
                onChange={handleChange}
            />

            <FormSelect
                name="type"
                value={data.type}
                label="Тип"
                options={typeOptions}
                fluid
                required
                onChange={handleChange}
            />

            <FormSelect
                name="format"
                value={data.format}
                label="Формат"
                options={formatOptions}
                fluid
                required
                onChange={handleChange}
            />

            <FormSelect
                name="age"
                value={data.age}
                label="Возрастная группа"
                options={ageOptions}
                fluid
                onChange={handleChange}
            />

            <FormSelect
                name="teacherType"
                value={data.teacherType}
                label="Тип преподавателя"
                options={teacherTypeOptions}
                fluid
                onChange={handleChange}
            />

            <FormInput
                type="number"
                name="lessonDuration"
                value={data.lessonDuration}
                label="Продолжительность урока"
                fluid
                onChange={handleChange}
            />

            <FormSelect
                name="level"
                value={data.level}
                label="Уровень"
                options={levelOptions}
                fluid
                onChange={handleChange}
            />

            <FormSelect
                name="purpose"
                value={data.purpose}
                label="Цель"
                options={purposeOptions}
                fluid
                onChange={handleChange}
            />

            <FormInput
                name="experience"
                value={data.experience}
                label="Опыт"
                fluid
                textarea
                onChange={handleChange}
            />

            <FormInput
                name="preferences"
                value={data.preferences}
                label="Пожелания"
                fluid
                textarea
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

            <FormInput
                name="note"
                value={data.note}
                label="Примечание"
                fluid
                textarea
                onChange={handleChange}
            />

            {enrollment.id &&
                <>
                    <UserSelect
                        name="managers"
                        value={data.managers}
                        label="Менеджеры"
                        items={managers.map(manager => ({
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
                        items={teachers.map(teacher => ({
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