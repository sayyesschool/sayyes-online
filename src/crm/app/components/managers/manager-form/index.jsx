import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';

import TimeZoneSelect from 'shared/components/timezone-select';
import { useFormData } from 'shared/hooks/form';
import datetime from 'shared/libs/datetime';
import { Form, IconButton } from 'shared/ui-components';
import { generatePassword } from 'shared/utils/password';

const genderItems = [
    { key: 'male', value: 'male', label: 'Мужской' },
    { key: 'value', value: 'female', label: 'Женский' }
];

const getDefaultData = ({
    firstname = '',
    lastname = '',
    patronym = '',
    phone = '',
    email = '',
    dob = '',
    gender = '',
    timezone = '',
    note = ''
}) => ({
    firstname,
    lastname,
    patronym,
    phone,
    email,
    gender,
    dob: dob ? datetime(dob).format('YYYY-MM-DD') : '',
    timezone,
    note
});

function ManagerForm({
    manager = {},
    onSubmit,
    ...props
}, ref) {
    const formRef = useRef();

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    const { data, getData, handleChange } = useFormData(getDefaultData(manager));

    const handleSubmit = useCallback(() => {
        getData(data => {
            onSubmit(data);
        });
    }, [manager]);

    return (
        <Form
            ref={formRef}
            className="ManagerForm"
            onSubmit={handleSubmit}
            {...props}
        >
            <Form.Input
                label="Имя"
                name="firstname"
                value={data.firstname}
                required
                onChange={handleChange}
            />

            <Form.Input
                label="Фамилия"
                name="lastname"
                value={data.lastname}
                required
                onChange={handleChange}
            />

            <Form.Input
                label="Отчество"
                name="patronym"
                value={data.patronym}
                onChange={handleChange}
            />

            <Form.Input
                label="Телефон"
                type="phone"
                name="phone"
                value={data.phone}
                required
                onChange={handleChange}
            />

            <Form.Input
                label="Электронная почта"
                type="email"
                name="email"
                value={data.email}
                required
                onChange={handleChange}
            />

            <Form.Input
                label="Дата рождения"
                type="date"
                name="dob"
                value={data.dob}
                onChange={handleChange}
            />

            <Form.RadioGroup
                label="Пол"
                name="gender"
                value={data.gender}
                items={genderItems}
                onChange={handleChange}
            />

            <TimeZoneSelect
                name="timezone"
                value={data.timezone}
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

export default forwardRef(ManagerForm);