import TimeZoneSelect from 'shared/components/timezone-select';
import { useForm } from 'shared/hooks/form';
import datetime from 'shared/libs/datetime';
import { Button, Flex, Form, Grid } from 'shared/ui-components';

import styles from './ProfileForm.module.scss';

const getDefaultValues = ({
    firstname = '',
    lastname = '',
    patronym = '',
    phone = '',
    email = '',
    dob = '',
    gender = '',
    timezone = 'Europe/Moscow',
    accounts
}) => ({
    'firstname*': firstname,
    lastname,
    patronym,
    phone,
    'email*': email,
    gender,
    dob: dob ? datetime(dob).format('YYYY-MM-DD') : '',
    timezone,
    accounts
});

const socialFields = [
    { name: 'skype', label: 'Skype' },
    { name: 'telegram', label: 'Telegram' },
    { name: 'zoom', label: 'Zoom' }
];

export default function ProfileForm({
    user,
    onSubmit,
    ...props
}) {
    const { data, handleChange, handleSubmit } = useForm({
        values: getDefaultValues(user),
        onSubmit
    });

    return (
        <Form
            className={styles.root}
            onSubmit={handleSubmit}
            {...props}
        >
            <div className={styles.container}>
                <div className={styles.section}>
                    <div className={styles.group}>
                        <Form.Input
                            name="firstname"
                            label="Имя"
                            value={data.firstname.value}
                            required
                            onChange={handleChange}
                        />

                        <Form.Input
                            name="lastname"
                            label="Фамилия"
                            value={data.lastname.value}
                            onChange={handleChange}
                        />

                        <Form.Input
                            name="patronym"
                            label="Отчество"
                            value={data.patronym.value}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.group}>
                        <Form.Input
                            type="email"
                            name="email"
                            label="Электронная почта"
                            value={data.email.value}
                            required
                            onChange={handleChange}
                        />

                        <Form.Input
                            name="phone"
                            label="Телефон"
                            value={data.phone.value}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.group}>
                        <Form.Input
                            type="date"
                            name="dob"
                            label="Дата рождения"
                            value={data.dob.value}
                            onChange={handleChange}
                        />

                        <TimeZoneSelect
                            value={data.timezone.value}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.group}>
                        {socialFields.map(({ name, label, type, required }) =>
                            <Form.Input
                                key={name}
                                name={`accounts.${name}`}
                                type={type}
                                value={data.accounts.value[name]}
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
            </div>
        </Form>
    );
}