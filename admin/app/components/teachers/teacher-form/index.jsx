import { forwardRef, useCallback, useState } from 'react';
import moment from 'moment';

import { useFormData } from 'shared/hooks/form';
import { Form, Icon } from 'shared/ui-components';
import TimeZoneSelect from 'shared/components/timezone-select';
import { generatePassword } from 'shared/utils/password';

export default forwardRef(TeacherForm);

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
    dob: dob ? moment(dob).format('YYYY-MM-DD') : '',
    timezone,
    note
});

function TeacherForm({ teacher = {}, onSubmit, ...props }, ref) {
    const { data, getData, handleChange } = useFormData(getDefaultData(teacher));

    const [password, setPassword] = useState(!teacher.id && generatePassword());

    const handleSubmit = useCallback(() => {
        getData(data => {
            if (!teacher.id) {
                data.password = password;
            }

            onSubmit(data);
        });
    }, [teacher]);

    return (
        <Form onSubmit={handleSubmit} {...props}>
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
                onChange={handleChange}
            />

            {!teacher.id &&
                <Form.Input
                    label="Пароль"
                    type="text"
                    name="password"
                    value={password}
                    autoComplete="off"
                    icon={<Icon onClick={() => setPassword(generatePassword())}>sync_lock</Icon>}
                />
            }

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