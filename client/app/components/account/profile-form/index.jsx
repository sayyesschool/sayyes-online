import { useCallback } from 'react';

import { timezones } from 'shared/data';
import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FormInput from 'shared/components/form-input';
import FormSelect from 'shared/components/form-select';

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
            <FormInput
                name="firstname"
                value={data.firstname}
                label="Имя"
                required
                onChange={handleChange}
            />

            <FormInput
                name="lastname"
                value={data.lastname}
                label="Фамилия"
                required
                onChange={handleChange}
            />

            <FormInput
                name="patronym"
                value={data.patronym}
                label="Отчество"
                onChange={handleChange}
            />

            <FormInput
                type="phone"
                name="phone"
                value={data.phone}
                label="Телефон"
                required
                onChange={handleChange}
            />

            <FormInput
                type="email"
                name="email"
                value={data.email}
                label="Электронная почта"
                onChange={handleChange}
            />

            <FormInput
                type="date"
                name="dob"
                value={data.dob ? moment(data.dob).format('YYYY-MM-DD') : ''}
                label="Дата рождения"
                onChange={handleChange}
            />

            <FormSelect
                name="timezone"
                value={data.timezone}
                label="Часовой пояс"
                options={timezoneOptions}
                onChange={handleChange}
            />
        </Form>
    );
}