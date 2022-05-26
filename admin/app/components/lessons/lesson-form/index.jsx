import { useCallback } from 'react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FormInput from 'shared/components/form-input';
import FormCheckbox from 'shared/components/form-checkbox';
import FormSelect from 'shared/components/form-select';
import PeopleSelect from 'shared/components/user-select';

import { useStore } from 'app/hooks/store';

import './index.scss';

const statuses = [
    { key: 'scheduled', value: 'scheduled', text: 'Запланировано' },
    { key: 'started', value: 'started', text: 'Началось' },
    { key: 'ended', value: 'ended', text: 'Завершилось' },
    { key: 'canceled', value: 'canceled', text: 'Отменено' },
];

const defaultLesson = {
    status: 'scheduled',
    duration: 50,
    date: new Date(),
    trial: false,
    free: false,
    note: ''
};

export default function LessonForm({ lesson = {}, onSubmit, ...props }) {
    const [teachers] = useStore('teachers.list');

    const { data, handleChange } = useForm({
        ...defaultLesson,
        ...lesson,
        teacher: lesson.teacher?.id || lesson.teacher || ''
    });

    const handleSubmit = useCallback(() => {
        data.date = moment(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
        data.teacher = data.teacher || undefined;

        onSubmit(data);
    }, [data]);

    return (
        <Form className="lesson-form" onSubmit={handleSubmit} {...props}>
            <FormSelect
                name="status"
                value={data.status}
                label="Статус"
                options={statuses}
                filled
                required
                onChange={handleChange}
            />

            <FormInput
                type="datetime-local"
                name="date"
                value={moment(data.date).format('YYYY-MM-DDTHH:mm')}
                label="Дата и время"
                filled
                onChange={handleChange}
            />

            <FormInput
                type="number"
                name="duration"
                step="5"
                value={data.duration}
                label="Продолжительность"
                suffix="мин."
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

            <FormCheckbox
                label="Пробное"
                name="trial"
                checked={data.trial}
                toggle
                onChange={handleChange}
            />

            <FormCheckbox
                label="Бесплатное"
                name="free"
                checked={data.free}
                toggle
                onChange={handleChange}
            />

            <FormCheckbox
                label="Подтвержденное"
                name="confirmed"
                checked={data.confirmed}
                toggle
                onChange={handleChange}
            />

            <FormInput
                name="note"
                value={data.note}
                label="Примечание"
                filled
                textarea
                onChange={handleChange}
            />
        </Form>
    );
}