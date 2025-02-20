import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import TimeZoneSelect from 'shared/components/timezone-select';
import { genderOptions, userDomainOptions } from 'shared/data/user';
import { useFormData } from 'shared/hooks/form';
import datetime from 'shared/libs/datetime';
import { Flex, Form } from 'shared/ui-components';

const getDefaultData = ({
    firstname = '',
    lastname = '',
    patronym = '',
    email = '',
    phone = '',
    dob = '',
    gender = '',
    timezone = '',
    note = '',
    domains = ['crm', 'lk']
}) => ({
    firstname,
    lastname,
    patronym,
    email,
    phone,
    gender,
    dob: dob ? datetime(dob).format('YYYY-MM-DD') : '',
    timezone,
    note,
    domains
});

function ManagerForm({
    manager = {},
    onSubmit,
    ...props
}, ref) {
    const formRef = useRef();

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    const { data, handleChange } = useFormData(getDefaultData(manager), [manager?.id]);

    const handleSubmit = useCallback(() => {
        onSubmit(data);
    }, [data, onSubmit]);

    return (
        <Form
            ref={formRef}
            className="ManagerForm"
            onSubmit={handleSubmit}
            {...props}
        >
            <Form.Input
                label="Имя"
                name="firstname"
                value={data.firstname}
                required
                onChange={handleChange}
            />

            <Form.Input
                label="Фамилия"
                name="lastname"
                value={data.lastname}
                required
                onChange={handleChange}
            />

            <Form.Input
                label="Отчество"
                name="patronym"
                value={data.patronym}
                onChange={handleChange}
            />

            <Form.Input
                label="Электронная почта"
                type="email"
                name="email"
                value={data.email}
                required
                onChange={handleChange}
            />

            <Form.Input
                label="Телефон"
                type="phone"
                name="phone"
                value={data.phone}
                onChange={handleChange}
            />

            <Form.Input
                label="Дата рождения"
                type="date"
                name="dob"
                value={data.dob}
                onChange={handleChange}
            />

            <Form.RadioGroup
                label="Пол"
                name="gender"
                value={data.gender}
                items={genderOptions}
                onChange={handleChange}
            />

            <TimeZoneSelect
                name="timezone"
                value={data.timezone}
                onChange={handleChange}
            />

            <Form.Textarea
                label="Примечание"
                name="note"
                value={data.note}
                onChange={handleChange}
            />

            <Form.Field label="Доступ">
                <Flex dir="column" gap="md">
                    {userDomainOptions.map(option => (
                        <Form.Checkbox
                            key={option.key}
                            name={`domains.${option.value}`}
                            value={option.value}
                            checked={data.domains.includes(option.value)}
                            onChange={handleChange}
                            {...option}
                        />
                    ))}
                </Flex>
            </Form.Field>
        </Form>
    );
}

export default forwardRef(ManagerForm);