import React, { useCallback } from 'react';
import {
    Layout,
    TextField
} from '@fluentui/react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import PeopleSelect from 'app/components/shared/people-picker';

import './index.scss';

const defaultData = () => ({
    date: new Date(),
    client: {},
    student: {},
    teacher: {},
    description: ''
});

export default function LessonForm({ lesson = defaultData(), onSubmit }) {
    const [data, setData] = useForm({
        date: moment(lesson.date).format('YYYY-MM-DDTHH:mm'),
        student: lesson.student && lesson.student.id,
        teacher: lesson.teacher && lesson.teacher.id
    });

    const handleSubmit = useCallback(() => {
        data.date = moment(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

        onSubmit(data);
    }, [data]);

    return (
        <Form id="lesson-form" onSubmit={handleSubmit}>
            <Layout>
                <TextField
                    type="date"
                    name="date"
                    value={data.dob}
                    placeholder="Дата"
                    onChange={setData}
                />

                <PeopleSelect
                    name="client"
                    value={data.client}
                    label="Клиент"
                    resolveUrl="/admin/api/clients"
                />

                <PeopleSelect
                    name="teacher"
                    value={data.teacher}
                    label="Преподаватель"
                    resolveUrl="/admin/api/teachers"
                />
            </Layout>
        </Form>
    );
}