import React from 'react';
import {
    ChoiceGroup,
    MaskedTextField,
    Pivot, PivotItem,
    TextField,
    Stack
} from '@fluentui/react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import DatePicker from 'app/components/shared/date-picker';

const defaultData = () => ({
    firstname: '',
    lastname: '',
    email: '',
    password: generatePassword(),
    phone: '',
    note: ''
});

const maskFormat = { '*': /[0-9]/ };

export default function StudentForm({ student = defaultData(), onSubmit }) {
    const [data, handleChange] = useForm({
        firstname: student.firstname,
        lastname: student.lastname,
        email: student.email,
        password: student.password,
        phone: student.phone,
        note: student.note
    });

    return (
        <Form id="student-form" onSubmit={() => onSubmit(data)}>
            <Stack tokens={{ childrenGap: 8 }}>
                <TextField
                    name="firstname"
                    value={data.firstname}
                    label="Имя"
                    required
                    onChange={handleChange}
                />

                <TextField
                    name="lastname"
                    value={data.lastname}
                    label="Фамилия"
                    required
                    onChange={handleChange}
                />

                <TextField
                    name="patronym"
                    value={data.patronym}
                    label="Отчество"
                    onChange={handleChange}
                />

                <TextField
                    type="email"
                    name="email"
                    value={data.email}
                    label="Электронная почта"
                    required
                    onChange={handleChange}
                />

                {data.password &&
                    <TextField
                        name="password"
                        value={data.password}
                        label="Пароль"
                        required
                        onChange={handleChange}
                    />
                }

                <MaskedTextField
                    name="phone"
                    value={data.phone}
                    label="Телефон"
                    required
                    mask="* *** *** ** **"
                    maskFormat={maskFormat}
                    onChange={handleChange}
                />

                <ChoiceGroup
                    name="gender"
                    label="Пол"
                    options={[
                        { key: 'male', text: 'Мужчина' },
                        { key: 'female', text: 'Женщина' }
                    ]}
                    onChange={handleChange}
                />

                <DatePicker
                    name="dob"
                    value={data.dob}
                    label="Дата рождения"
                    onChange={handleChange}
                />

                <TextField
                    name="note"
                    value={data.note}
                    label="Примечание"
                    multiline
                    onChange={handleChange}
                />
            </Stack>
        </Form>
    );
}

function generatePassword() {
    const buf = new Uint8Array(6);
    crypto.getRandomValues(buf);
    return btoa(String.fromCharCode(...buf));
}