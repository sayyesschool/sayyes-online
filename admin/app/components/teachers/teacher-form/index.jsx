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
                name="firstname"
                value={data.firstname}
                label="Имя"
                required
                onChange={handleChange}
            />

            <Form.Input
                name="lastname"
                value={data.lastname}
                label="Фамилия"
                required
                onChange={handleChange}
            />

            <Form.Input
                name="patronym"
                value={data.patronym}
                label="Отчество"
                onChange={handleChange}
            />

            <Form.Input
                type="phone"
                name="phone"
                value={data.phone}
                label="Телефон"
                required
                onChange={handleChange}
            />

            <Form.Input
                type="email"
                name="email"
                value={data.email}
                label="Электронная почта"
                onChange={handleChange}
            />

            {!teacher.id &&
                <Form.Input
                    type="text"
                    name="password"
                    value={password}
                    label="Пароль"
                    autoComplete="off"
                    icon={<Icon onClick={() => setPassword(generatePassword())}>sync_lock</Icon>}
                />
            }

            <Form.Input
                type="date"
                name="dob"
                value={data.dob}
                label="Дата рождения"
                onChange={handleChange}
            />

            <Form.RadioGroup
                name="gender"
                value={data.gender}
                label="Пол"
                items={genderItems}
                onChange={handleChange}
            />

            <TimeZoneSelect
                name="timezone"
                value={data.timezone}
                onChange={handleChange}
            />

            <Form.Textarea
                name="note"
                value={data.note}
                label="Примечание"
                onChange={handleChange}
            />
        </Form>
    );
}