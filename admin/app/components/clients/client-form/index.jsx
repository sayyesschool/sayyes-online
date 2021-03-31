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

const defaultClient = {
    firstname: '',
    lastname: '',
    patronym: '',
    email: '',
    phone: '',
    altPhone: '',
    occupation: '',
    interests: '',
    timezone: '',
    note: ''
};

export default forwardRef(ClientForm);

function ClientForm({ client = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    const [data, handleChange] = useForm({
        ...defaultClient,
        ...client,
        requests: undefined,
        enrollments: undefined,
        payments: undefined,
        lessons: undefined
    }, [client?.id]);

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    return (
        <Form ref={formRef} className="client-form" onSubmit={() => onSubmit(data)} {...props}>
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
                    type="phone"
                    name="altPhone"
                    value={data.altPhone}
                    label="Дополнительный телефон"
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

                {client?.id &&
                    <>
                        <TextField
                            type="date"
                            name="dob"
                            value={data.dob ? moment(data.dob).format('YYYY-MM-DD') : ''}
                            label="Дата рождения"
                            filled
                            onChange={handleChange}
                        />

                        <TextField
                            type="text"
                            name="occupation"
                            value={data.occupation}
                            label="Род деятельности"
                            filled
                            onChange={handleChange}
                        />

                        <TextField
                            type="text"
                            name="interests"
                            value={data.interests}
                            label="Интересы"
                            filled
                            onChange={handleChange}
                        />

                        <TimeZoneSelect
                            name="timezone"
                            value={data.timezone}
                            onChange={handleChange}
                        />
                    </>
                }

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