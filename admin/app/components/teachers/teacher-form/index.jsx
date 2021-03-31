import React from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import RadioGroup from 'shared/components/radio-group';
import TimeZoneSelect from 'shared/components/timezone-select';

const defaultTeacher = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    timezone: '',
    note: ''
};

export default function TeacherForm({ id = 'teacher-form', teacher = {}, onSubmit }) {
    const [data, handleChange] = useForm({
        ...defaultTeacher,
        ...teacher
    });

    return (
        <Form id={id} onSubmit={() => onSubmit(data)}>
            <Layout column>
                <TextField
                    name="firstname"
                    value={data.firstname}
                    label="Имя"
                    filled
                    required
                    onChange={handleChange}
                />

                <TextField
                    name="lastname"
                    value={data.lastname}
                    label="Фамилия"
                    filled
                    required
                    onChange={handleChange}
                />

                <TextField
                    name="patronym"
                    value={data.patronym}
                    label="Отчество"
                    filled
                    onChange={handleChange}
                />

                <TextField
                    type="phone"
                    name="phone"
                    value={data.phone}
                    label="Телефон"
                    required
                    filled
                    onChange={handleChange}
                />

                <TextField
                    type="email"
                    name="email"
                    value={data.email}
                    label="Электронная почта"
                    filled
                    onChange={handleChange}
                />

                <TextField
                    type="date"
                    name="dob"
                    value={data.dob ? moment(data.dob).format('YYYY-MM-DD') : ''}
                    label="Дата рождения"
                    filled
                    onChange={handleChange}
                />

                <TimeZoneSelect
                    name="timezone"
                    onChange={handleChange}
                />

                <RadioGroup
                    name="gender"
                    value={data.gender}
                    label="Пол"
                    options={[
                        { value: 'man', label: 'Мужчина' },
                        { value: 'woman', label: 'Женщина' }
                    ]}
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
        </Form>
    );
}