import { useCallback } from 'react';
import moment from 'moment';

import { useFormData } from 'shared/hooks/form';
import Form from 'shared/components/form';
import FormInput from 'shared/components/form-input';
import FormSelect from 'shared/components/form-select';
import FormTextArea from 'shared/components/form-textarea';

import './index.scss';

const statuses = [
    { key: 'scheduled', value: 'scheduled', content: 'Запланирован' },
    { key: 'ended', value: 'ended', content: 'Завершился' },
    { key: 'missed', value: 'missed', content: 'Пропущен' },
    { key: 'canceled', value: 'canceled', content: 'Отменен' }
];

const defaultLesson = {
    status: 'scheduled',
    duration: 50,
    date: moment().format('YYYY-MM-DDTHH:mm'),
    note: ''
};

const minDate = moment().subtract(1, 'hour');

export default function LessonForm({ lesson = defaultLesson, onSubmit, ...props }) {
    const { data, getData, handleChange } = useFormData({
        status: lesson.status,
        duration: lesson.duration,
        date: lesson.date,
        note: ''
    });

    const handleSubmit = useCallback(() => {
        getData(data => {
            onSubmit({
                ...data,
                date: new Date(data.date).toISOString()
            });
        });
    }, [onSubmit]);

    return (
        <Form className="lesson-form" onSubmit={handleSubmit} {...props}>
            <FormSelect
                name="status"
                value={data.status}
                options={statuses}
                label="Статус"
                required
                fluid
                onChange={handleChange}
            />

            <FormInput
                type="datetime-local"
                name="date"
                value={moment(data.date).format('YYYY-MM-DDTHH:mm')}
                label="Дата и время"
                min={data.status === 'scheduled' && minDate.format('YYYY-MM-DDTHH:mm')}
                message={`Московское время: ${moment(data.date).utc().add(3, 'hours').format('HH:mm')}`}
                required
                fluid
                onChange={handleChange}
            />

            <FormInput
                type="number"
                name="duration"
                step="5"
                value={data.duration}
                label="Продолжительность, мин."
                fluid
                onChange={handleChange}
            />

            <FormTextArea
                name="note"
                value={data.note}
                label="Примечание"
                fluid
                onChange={handleChange}
            />
        </Form>
    );
}