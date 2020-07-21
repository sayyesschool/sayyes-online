import React from 'react';
import {
    Icon,
    IconButton,
    Layout,
    TextField,
    Select, SelectOption
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

const defaultData = () => ({
    firstname: '',
    lastname: '',
    patronym: '',
    phone: '',
    email: '',
    gender: '',
    password: generatePassword(),
    role: 'host'
});

export default function UserForm({ user = defaultData(), onSubmit }) {
    const [data, setData] = useForm({
        firstname: user.firstname,
        lastname: user.lastname,
        patronym: user.patronym,
        email: user.email,
        password: user.password,
        role: user.role
    });

    return (
        <Form id="user-form" onSubmit={() => onSubmit(data)}>
            <Layout column>
                <TextField
                    name="firstname"
                    value={data.firstname}
                    label="Имя"
                    outlined
                    required
                    onChange={setData}
                />

                <TextField
                    name="lastname"
                    value={data.lastname}
                    label="Фамилия"
                    outlined
                    required
                    onChange={setData}
                />

                <TextField
                    type="email"
                    name="email"
                    value={data.email}
                    label="Электронная почта"
                    outlined
                    required
                    onChange={setData}
                />

                {data.password &&
                    <TextField
                        name="password"
                        value={data.password}
                        label="Пароль"
                        outlined
                        required
                        onChange={setData}
                        trailingIcon={
                            <IconButton onClick={() => setData(generatePassword(), { name: 'password' })}>
                                <Icon>refresh</Icon>
                            </IconButton>
                        }
                    />
                }

                <Select
                    name="role"
                    value={data.role}
                    label="Роль"
                    outlined
                    required
                    onChange={setData}
                >
                    {[
                        { value: 'admin', label: 'Администратор' },
                        { value: 'host', label: 'Ведущий' },
                        { value: 'participant', label: 'Участник' },
                    ].map(role =>
                        <SelectOption key={role.value} value={role.value}>
                            {role.label}
                        </SelectOption>
                    )}
                </Select>
            </Layout>
        </Form>
    );
}

function generatePassword() {
    var buf = new Uint8Array(6);
    window.crypto.getRandomValues(buf);
    return btoa(String.fromCharCode.apply(null, buf));
}