import React, { useCallback } from 'react';
import {
    Button,
    FormField,
    Layout,
    Switch,
    TextField
} from 'mdc-react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import { useStore } from 'app/store';
import PeopleSelect from 'app/components/shared/people-select';

import './index.scss';

export default function LessonForm({ lesson = {}, onSubmit }) {
    const [teachers] = useStore('teachers.list');
    const [data, handleChange] = useForm({
        date: new Date(),
        trial: false,
        note: '',
        ...data,
        date: moment(lesson.date).format('YYYY-MM-DDTHH:mm'),
        client: lesson.client ? lesson.client.id : '',
        teacher: lesson.teacher ? lesson.teacher.id : '',
        note: lesson.note
    });

    const handleSubmit = useCallback(() => {
        data.date = moment(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
        data.teacher = data.teacher || undefined;

        onSubmit(data);
    }, [data]);

    return (
        <Form id="lesson-form" onSubmit={handleSubmit}>
            <Layout column>
                <FormField label="Пробный">
                    <Switch
                        name="trial"
                        checked={data.trial}
                        onChange={handleChange}
                    />
                </FormField>

                <TextField
                    type="datetime-local"
                    name="date"
                    value={moment(data.date).format('YYYY-MM-DDTHH:mm')}
                    label="Дата и время"
                    filled
                    onChange={handleChange}
                />

                <PeopleSelect
                    name="client"
                    label="Клиент"
                    value={data.client}
                    options={[{
                        key: lesson.client.id,
                        value: lesson.client.id,
                        text: lesson.client.fullname
                    }]}
                    disabled
                />

                <PeopleSelect
                    name="teacher"
                    value={data.teacher}
                    label="Преподаватель"
                    options={teachers.map(teacher => ({
                        key: teacher.id,
                        value: teacher.id,
                        text: teacher.fullname
                    }))}
                    onChange={handleChange}
                />

                <TextField
                    name="note"
                    value={data.note}
                    label="Примечание"
                    filled
                    textarea
                    onChange={handleChange}
                />
            </Layout>

            <Button type="submit" outlined>Сохранить</Button>
        </Form>
    );
}