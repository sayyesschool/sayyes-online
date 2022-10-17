import { useCallback } from 'react';

import { timezones } from 'shared/data';
import useForm from 'shared/hooks/form';
import Form from 'shared/ui-components/form';

const timezoneOptions = timezones.map(item => ({
    key: item.value,
    value: item.value,
    text: item.text
}));

export default function ProfileForm({ profile, onSubmit, ...props }) {
    const { data, handleChange, getData } = useForm({
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

            <Form.Input
                type="date"
                name="dob"
                value={data.dob ? moment(data.dob).format('YYYY-MM-DD') : ''}
                label="Дата рождения"
                onChange={handleChange}
            />

            <Form.Select
                name="timezone"
                value={data.timezone}
                label="Часовой пояс"
                options={timezoneOptions}
                onChange={handleChange}
            />
        </Form>
    );
}