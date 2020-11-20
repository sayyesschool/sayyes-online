import React from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

export default function MeetingRegistrationForm({ onSubmit }) {
    const [data, setData] = useForm({
        firstname: '',
        lastname: '',
        email: ''
    });
    
    return (
        <Form id="meeting-registration-form" onSubmit={() => onSubmit(data)}>
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
            </Layout>
        </Form>
    );
}