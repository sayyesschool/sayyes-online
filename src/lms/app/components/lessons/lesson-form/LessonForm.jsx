import { useCallback } from 'react';

import { useFormData } from 'shared/hooks/form';
import Form from 'shared/ui-components/form';
import datetime from 'shared/libs/datetime';

const statusOptions = [
    { key: 'scheduled', value: 'scheduled', content: 'Запланирован' },
    { key: 'ended', value: 'ended', content: 'Завершился' },
    { key: 'missed', value: 'missed', content: 'Пропущен' },
    { key: 'canceled', value: 'canceled', content: 'Отменен' }
];

const getDefaultData = data => ({
    status: 'scheduled',
    duration: 50,
    date: datetime().format('YYYY-MM-DDTHH:mm'),
    note: '',
    ...data
});

const minDate = datetime().subtract(1, 'hour');

export default function LessonForm({ lesson, onSubmit, ...props }) {
    const { data, getData, handleChange } = useFormData(getDefaultData(lesson));

    const handleSubmit = useCallback(() => {
        getData(data => {
            onSubmit({
                ...data,
                date: new Date(data.date).toISOString()
            });
        });
    }, [onSubmit]);

    return (
        <Form
            className="LessonForm"
            onSubmit={handleSubmit}
            {...props}
        >
            <Form.Select
                label="Статус"
                name="status"
                value={data.status}
                options={statusOptions}
                required
                onChange={handleChange}
            />

            <Form.Input
                label="Дата и время"
                type="datetime-local"
                name="date"
                value={datetime(data.date).format('YYYY-MM-DDTHH:mm')}
                min={data.status === 'scheduled' && minDate.format('YYYY-MM-DDTHH:mm')}
                message={`Московское время: ${datetime(data.date).utc().add(3, 'hours').format('HH:mm')}`}
                required
                onChange={handleChange}
            />

            <Form.Input
                label="Продолжительность, мин."
                type="number"
                name="duration"
                value={data.duration}
                step="5"
                onChange={handleChange}
            />

            <Form.Textarea
                label="Примечание"
                name="note"
                value={data.note}
                onChange={handleChange}
            />
        </Form>
    );
}