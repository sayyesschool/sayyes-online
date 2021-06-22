import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import RadioGroup from 'shared/components/radio-group';
import TimeZoneSelect from 'shared/components/timezone-select';

const defaultManager = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    timezone: '',
    note: ''
};

export default forwardRef(ManagerForm);

function ManagerForm({ manager = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    const [data, handleChange] = useForm({
        ...defaultManager,
        ...manager,
        requests: undefined,
        enrollments: undefined,
        payments: undefined
    });

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    return (
        <Form ref={formRef} className="manager-form" onSubmit={() => onSubmit(data)} {...props}>
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
                    value={data.timezone}
                    onChange={handleChange}
                />

                <RadioGroup
                    name="gender"
                    value={data.gender}
                    label="Пол"
                    options={[
                        { value: 'male', label: 'Мужской' },
                        { value: 'female', label: 'Женский' }
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