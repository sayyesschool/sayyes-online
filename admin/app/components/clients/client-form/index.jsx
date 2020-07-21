import React from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import RadioGroup from 'app/components/shared/radio-group';

const defaultData = () => ({
    firstname: '',
    lastname: '',
    email: '',
    password: generatePassword(),
    phone: '',
    note: ''
});

const maskFormat = { '*': /[0-9]/ };

export default function ClientForm({ client = defaultData(), onSubmit }) {
    const [data, handleChange] = useForm({
        firstname: client.firstname,
        lastname: client.lastname,
        email: client.email,
        password: client.password,
        phone: client.phone,
        note: client.note
    });

    return (
        <Form id="client-form" onSubmit={() => onSubmit(data)}>
            <Layout>
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

                <TextField
                    type="phone"
                    name="phone"
                    value={data.phone}
                    label="Телефон"
                    required
                    // mask="* *** *** ** **"
                    // maskFormat={maskFormat}
                    onChange={handleChange}
                />

                <RadioGroup
                    name="gender"
                    value={data.gender}
                    label="Пол"
                    options={[
                        { value: 'male', label: 'Мужчина' },
                        { value: 'female', label: 'Женщина' }
                    ]}
                    onChange={handleChange}
                />

                <TextField
                    type="date"
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
            </Layout>
        </Form>
    );
}

function generatePassword() {
    const buf = new Uint8Array(6);
    crypto.getRandomValues(buf);
    return btoa(String.fromCharCode(...buf));
}