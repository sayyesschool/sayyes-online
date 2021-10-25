import { useCallback } from 'react';
import {
    Layout,
    FormField,
    Select,
    Switch,
    TextField
} from 'mdc-react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import PeopleSelect from 'shared/components/people-select';

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

    const [data, handleChange] = useForm({
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
            <Layout column>
                <Select
                    name="status"
                    value={data.status}
                    label="Статус"
                    options={statuses}
                    filled
                    required
                    onChange={handleChange}
                />

                <TextField
                    type="datetime-local"
                    name="date"
                    value={moment(data.date).format('YYYY-MM-DDTHH:mm')}
                    label="Дата и время"
                    filled
                    onChange={handleChange}
                />

                <TextField
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

                <FormField label="Пробное" alignEnd spaceBetween>
                    <Switch
                        name="trial"
                        checked={data.trial}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField label="Бесплатное" alignEnd spaceBetween>
                    <Switch
                        name="free"
                        checked={data.free}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField label="Подтвержденное" alignEnd spaceBetween>
                    <Switch
                        name="confirmed"
                        checked={data.confirmed}
                        onChange={handleChange}
                    />
                </FormField>

                <TextField
                    name="note"
                    value={data.note}
                    label="Примечание"
                    filled
                    textarea
                    onChange={handleChange}
                />
            </Layout>
        </Form>
    );
}