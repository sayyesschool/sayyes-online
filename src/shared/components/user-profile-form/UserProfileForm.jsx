import moment from 'moment';

import { timezones } from 'shared/data';
import { useForm } from 'shared/hooks/form';
import { Button, Form, Select } from 'shared/ui-components';

import styles from './UserProfileForm.module.scss';

const timezoneOptions = timezones.map(item => ({
    key: item.value,
    value: item.value,
    label: item.text
}));

const fields = [
    { name: 'firstname', label: 'Имя', required: true },
    { name: 'lastname', label: 'Фамилия', required: true },
    { name: 'patronym', label: 'Отчество' },
    { name: 'email', label: 'Электронная почта', type: 'email', required: true },
    { name: 'phone', label: 'Телефон', type: 'phone', required: true },
    { name: 'dob', label: 'Дата рождения', type: 'date', format: 'YYYY-MM-DD' },
    { name: 'timezone', label: 'Часовой пояс', type: 'select', options: timezoneOptions },
    { name: 'zoom', label: 'Zoom' },
    { name: 'skype', label: 'Skype' },
    { name: 'telegram', label: 'Telegram' }
];
const personalFields = fields.slice(0, 6);
const socialFields = fields.slice(7);

export default function UserProfileForm({
    user,
    onSubmit,
    ...props
}) {
    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = user[field.name] || '';

        return acc;
    }, {});

    const { data, handleChange, handleSubmit } = useForm({
        values: initialValues,
        onSubmit
    });

    return (
        <Form
            id="profile-form"
            className={styles.root}
            sx={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={handleSubmit}
            {...props}
        >
            <div className={styles.container}>
                <div className={styles.personal}>
                    {personalFields.map(({ name, label, type, required, format }) => {
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
                        {timezoneOptions.map(option =>
                            <Select.Option
                                key={option.value}
                                value={option.value}
                                label={option.label}
                            >
                                {option.label}
                            </Select.Option>
                        )}
                    </Form.Select>
                </div>

                <div className={styles.social}>
                    {socialFields.map(({ name, label, type, required }) =>
                        <Form.Input
                            key={name}
                            name={name}
                            type={type}
                            value={data[name].value}
                            label={label}
                            required={required}
                            onChange={handleChange}
                        />
                    )}
                </div>
            </div>

            <Button
                className={styles.save}
                type="submit"
                content="Сохранить"
            />
        </Form>
    );
}