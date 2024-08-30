import { useCallback } from 'react';

import moment from 'moment';

import { timezones } from 'shared/data';
import { useForm } from 'shared/hooks/form';
import { Button, Form, Select } from 'shared/ui-components';

import styles from './ProfileForm.module.scss';

const timezoneOptions = timezones.map(item => ({
    key: item.value,
    value: item.value,
    label: item.text
}));

const fields = [
    { name: 'firstname', label: 'Имя', required: true },
    { name: 'lastname', label: 'Фамилия', required: true },
    { name: 'patronym', label: 'Отчество' },
    { name: 'phone', label: 'Телефон', type: 'phone', required: true },
    { name: 'email', label: 'Электронная почта', type: 'email' },
    { name: 'dob', label: 'Дата рождения', type: 'date', format: 'YYYY-MM-DD' },
    { name: 'timezone', label: 'Часовой пояс', type: 'select', options: timezoneOptions },
    { name: 'zoom', label: 'Zoom' },
    { name: 'skype', label: 'Skype' },
    { name: 'telegram', label: 'Telegram' }
];

export default function ProfileForm({ profile, updateProfile, ...props }) {
    const personalInputForms = fields.slice(0, 6);
    const socialInputForms = fields.slice(7);

    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = profile[field.name] || '';

        return acc;
    }, {});

    const onSubmit = useCallback(data => {
        updateProfile(data);
    }, [updateProfile]);

    const { data, handleChange, handleSubmit } = useForm({
        values: initialValues,
        onSubmit
    });

    return (
        <Form
            className={styles.root}
            id="profile-form"
            sx={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={handleSubmit}
            {...props}
        >
            <div className={styles.formData}>
                <div className={styles.personal}>
                    {personalInputForms.map(({ name, label, type, required, format }) => {
                        const value = format
                            ? moment(data[name]).format(format)
                            : data[name].value;

                        return (
                            <Form.Input
                                key={name}
                                name={name}
                                type={type}
                                value={value}
                                label={label}
                                required={required}
                                onChange={handleChange}
                            />
                        );
                    }
                    )}

                    <Form.Select
                        name="timezone"
                        label="Часовой пояс"
                        defaultValue="Europe/Moscow"
                        onChange={handleChange}
                    >
                        {timezoneOptions.map(option => (
                            <Select.Option
                                key={option.value}
                                value={option.value}
                                label={option.label}
                            >
                                {option.label}
                            </Select.Option>
                        ))}
                    </Form.Select>
                </div>

                <div className={styles.social}>
                    {socialInputForms.map(({ name, label, type, required }) => (
                        <Form.Input
                            key={name}
                            name={name}
                            type={type}
                            value={data[name].value}
                            label={label}
                            required={required}
                            onChange={handleChange}
                        />)
                    )}
                </div>
            </div>

            <Button
                type="submit"
                content="Сохранить"
                className={styles.save}
            />
        </Form>
    );
}