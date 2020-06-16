import React, { useRef, useState, useEffect } from 'react';
import {
    Button,
    FormField,
    Layout,
    Select, SelectOption,
    Spinner,
    Switch,
    TextField,
    Typography
} from 'mdc-react';
import moment from 'moment';

import api from 'shared/api';
import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

import './index.scss';

const defaultData = () => ({
    date: new Date(),
    student: {},
    teacher: {},
    description: ''
});

export default function LessonForm({ lesson = defaultData(), onSubmit }) {
    const [teachers, setTeachers] = useState();
    const [data, setData] = useForm({
        date: moment(lesson.date).format('YYYY-MM-DDTHH:mm'),
        student: lesson.student && lesson.student.id,
        teacher: lesson.teacher && lesson.teacher.id
    });

    useEffect(() => {
        api.get('/admin/api/users?role=teacher')
            .then(users => setTeachers(users));
    }, []);

    function handleSubmit() {
        data.date = moment(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

        onSubmit(data);
    }

    if (!teachers) return <Spinner />;

    return (
        <Form id="lesson-form" onSubmit={handleSubmit}>
            <Layout column>
                <TextField
                    type="datetime-local"
                    name="date"
                    value={data.date}
                    label="Когда"
                    outlined
                    required
                    onChange={setData}
                />

                <Select
                    name="host"
                    value={data.host}
                    label="Ведущий"
                    outlined
                    onChange={setData}
                >
                    {teachers.map(teacher =>
                        <SelectOption
                            key={teacher.id}
                            value={teacher.id}
                        >
                            {teacher.fullname}
                        </SelectOption>
                    )}
                </Select>
            </Layout>
        </Form>
    );
}