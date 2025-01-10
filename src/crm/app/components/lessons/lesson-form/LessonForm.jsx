import { useCallback } from 'react';

import { useFormData } from 'shared/hooks/form';
import datetime from 'shared/libs/datetime';
import { Checkbox, Form } from 'shared/ui-components';

import { useStore } from 'crm/hooks/store';

const statuses = [
    { key: 'scheduled', value: 'scheduled', content: 'Запланировано' },
    { key: 'started', value: 'started', content: 'Началось' },
    { key: 'ended', value: 'ended', content: 'Завершилось' },
    { key: 'canceled', value: 'canceled', content: 'Отменено' }
];

const getFormData = ({
    status = 'scheduled',
    duration = 50,
    date = new Date(),
    trial = false,
    free = false,
    note = '',
    teacher = ''
}) => ({
    status,
    duration,
    date: datetime(date).format('YYYY-MM-DDTHH:mm'),
    trial,
    free,
    note,
    teacher: teacher?.id || teacher
});

export default function LessonForm({ lesson = {}, onSubmit, ...props }) {
    const [teachers] = useStore('teachers.list');

    const { data, handleChange } = useFormData(getFormData(lesson));

    const handleSubmit = useCallback(() => {
        data.date = datetime(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
        data.teacher = data.teacher || undefined;

        onSubmit(data);
    }, [data]);

    return (
        <Form
            className="LessonForm" onSubmit={handleSubmit}
            {...props}
        >
            <Form.Select
                label="Статус"
                name="status"
                value={data.status}
                options={statuses}
                required
                onChange={handleChange}
            />

            <Form.Input
                label="Дата и время"
                type="datetime-local"
                name="date"
                value={data.date}
                onChange={handleChange}
            />

            <Form.Input
                label="Продолжительность, мин."
                type="number"
                name="duration"
                step="5"
                value={data.duration}
                onChange={handleChange}
            />

            <Form.Select
                label="Преподаватель"
                name="teacher"
                value={data.teacher}
                options={teachers?.map(teacher => ({
                    key: teacher.id,
                    value: teacher.id,
                    content: teacher.fullname
                }))}
                onChange={handleChange}
            />

            <Checkbox
                label="Пробное"
                name="trial"
                checked={data.trial}
                onChange={handleChange}
            />

            <Checkbox
                label="Бесплатное"
                name="free"
                checked={data.free}
                onChange={handleChange}
            />

            <Checkbox
                label="Подтвержденное"
                name="confirmed"
                checked={data.confirmed}
                onChange={handleChange}
            />

            <Form.Input
                label="Примечание"
                name="note"
                value={data.note}
                onChange={handleChange}
            />
        </Form>
    );
}