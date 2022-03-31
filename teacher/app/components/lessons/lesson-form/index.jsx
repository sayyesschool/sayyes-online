import moment from 'moment';

import { useForm } from 'shared/hooks/form';
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
    const { data, handleChange, handleSubmit } = useForm({
        values: {
            'status*': lesson.status,
            duration: lesson.duration,
            date: lesson.date,
            note: ''
        },
        onSubmit
    });

    return (
        <Form className="lesson-form" onSubmit={handleSubmit} {...props}>
            <FormSelect
                name="status"
                value={data.status.value}
                options={statuses}
                label="Статус"
                required
                fluid
                onChange={handleChange}
            />

            <FormInput
                type="datetime-local"
                name="date"
                value={moment(data.date.value).format('YYYY-MM-DDTHH:mm')}
                label="Дата и время"
                min={data.status.value === 'scheduled' && minDate.format('YYYY-MM-DDTHH:mm')}
                message={`Московское время: ${moment(data.date.value).utc().add(3, 'hours').format('HH:mm')}`}
                required
                fluid
                onChange={handleChange}
            />

            <FormInput
                type="number"
                name="duration"
                step="5"
                value={data.duration.value}
                label="Продолжительность, мин."
                fluid
                onChange={handleChange}
            />

            <FormTextArea
                name="note"
                value={data.note.value}
                label="Примечание"
                fluid
                onChange={handleChange}
            />
        </Form>
    );
}