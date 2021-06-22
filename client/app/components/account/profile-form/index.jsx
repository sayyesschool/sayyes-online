import React, { useCallback } from 'react';
import {
    Layout,
    Select,
    TextField
} from 'mdc-react';

import { timezones } from 'shared/data';
import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

export default function ProfileForm({ profile, onSubmit, ...props }) {
    const [data, handleChange, getData] = useForm({
        firstname: profile.firstname || '',
        lastname: profile.lastname || '',
        email: profile.email || '',
        phone: profile.phone || '',
        timezone: profile.timezone || ''
    });

    const handleSubmit = useCallback(() => {
        getData(onSubmit);
    }, []);

    return (
        <Form id="profile-form" onSubmit={handleSubmit} {...props}>
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

                <Select
                    name="timezone"
                    value={data.timezone}
                    label="Часовой пояс"
                    options={timezones.map(item => ({
                        key: item.value,
                        value: item.value,
                        text: item.text
                    }))}
                    menuProps={{
                        fullWidth: true,
                        style: { maxHeight: '300px' }
                    }}
                    filled
                    onChange={handleChange}
                />
            </Layout>
        </Form>
    );
}