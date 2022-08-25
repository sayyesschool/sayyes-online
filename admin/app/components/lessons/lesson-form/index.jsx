import { useCallback } from 'react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FormInput from 'shared/components/form-input';
import FormCheckbox from 'shared/components/form-checkbox';
import FormSelect from 'shared/components/form-select';

import { useStore } from 'app/hooks/store';

import './index.scss';

const statuses = [
    { key: 'scheduled', value: 'scheduled', header: 'Запланировано' },
    { key: 'started', value: 'started', header: 'Началось' },
    { key: 'ended', value: 'ended', header: 'Завершилось' },
    { key: 'canceled', value: 'canceled', header: 'Отменено' },
];

const getFormData = ({
    status = 'scheduled',
    duration = 50,
    date = new Date(),
    trial = false,
    free = false,
    note = '',
    teacher = {}
}) => ({
    status,
    duration,
    date,
    trial,
    free,
    note,
    teacher: teacher?.id || teacher || ''
});

export default function LessonForm({ lesson = {}, onSubmit, ...props }) {
    const [teachers] = useStore('teachers.list');

    const { data, handleChange } = useForm(getFormData(lesson));

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
                required
                onChange={handleChange}
            />

            <FormInput
                type="datetime-local"
                name="date"
                value={moment(data.date).format('YYYY-MM-DDTHH:mm')}
                label="Дата и время"
                onChange={handleChange}
            />

            <FormInput
                type="number"
                name="duration"
                step="5"
                value={data.duration}
                label="Продолжительность, мин."
                onChange={handleChange}
            />

            <FormSelect
                name="teacher"
                value={data.teacher}
                label="Преподаватель"
                options={teachers?.map(teacher => ({
                    key: teacher.id,
                    value: teacher.id,
                    header: teacher.fullname,
                    image: teacher.imageUrl
                }))}
                search
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
                onChange={handleChange}
            />
        </Form>
    );
}