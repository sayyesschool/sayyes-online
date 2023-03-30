import { forwardRef, useImperativeHandle, useRef } from 'react';
import moment from 'moment';

import { useForm } from 'shared/hooks/form';
import TimeZoneSelect from 'shared/components/timezone-select';
import { Form } from 'shared/ui-components';

const genderOptions = [
    { key: 'male', value: 'male', label: 'Мужской' },
    { key: 'female', value: 'female', label: 'Женский' }
];

const getFormData = ({
    hhid = '',
    firstname = '',
    lastname = '',
    patronym = '',
    email = '',
    gender = '',
    dob = '',
    phone = '',
    altPhone = '',
    address = '',
    occupation = '',
    interests = '',
    timezone = '',
    note = ''
}) => ({
    hhid,
    firstname,
    lastname,
    patronym,
    email,
    gender,
    dob: dob ? moment(dob).format('YYYY-MM-DD') : '',
    phone,
    altPhone,
    address,
    occupation,
    interests,
    timezone,
    note
});

const ClientForm = forwardRef(({
    client = {},
    onSubmit,

    ...props
}, ref) => {
    const formRef = useRef();

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    const { data, handleChange, handleSubmit } = useForm({
        values: getFormData(client),
        onSubmit
    }, [client?.id]);

    return (
        <Form
            ref={formRef}
            className="sy-ClientForm"
            onSubmit={handleSubmit}
            {...props}
        >
            <Form.Input
                name="hhid"
                value={data.hhid.value}
                label="Hollihop ID"
                onChange={handleChange}
            />

            <Form.Input
                name="firstname"
                value={data.firstname.value}
                label="Имя"
                required
                onChange={handleChange}
            />

            <Form.Input
                name="lastname"
                value={data.lastname.value}
                label="Фамилия"
                onChange={handleChange}
            />

            <Form.Input
                name="patronym"
                value={data.patronym.value}
                label="Отчество"
                onChange={handleChange}
            />

            <Form.Input
                type="phone"
                name="phone"
                value={data.phone.value}
                label="Телефон"
                required
                onChange={handleChange}
            />

            <Form.Input
                type="phone"
                name="altPhone"
                value={data.altPhone.value}
                label="Дополнительный телефон"
                onChange={handleChange}
            />

            <Form.Input
                type="email"
                name="email"
                value={data.email.value}
                label="Электронная почта"
                onChange={handleChange}
            />

            <Form.RadioGroup
                name="gender"
                value={data.gender.value}
                label="Пол"
                items={genderOptions}
                onChange={handleChange}
            />

            {client?.id &&
                <>
                    <Form.Input
                        type="date"
                        name="dob"
                        value={data.dob}
                        label="Дата рождения"
                        onChange={handleChange}
                    />

                    <TimeZoneSelect
                        name="timezone"
                        value={data.timezone}
                        onChange={handleChange}
                    />

                    <Form.Input
                        type="text"
                        name="address"
                        value={data.address}
                        label="Адрес"
                        onChange={handleChange}
                    />

                    <Form.Input
                        type="text"
                        name="occupation"
                        value={data.occupation}
                        label="Род деятельности"
                        onChange={handleChange}
                    />

                    <Form.Input
                        type="text"
                        name="interests"
                        value={data.interests}
                        label="Интересы"
                        onChange={handleChange}
                    />
                </>
            }

            <Form.Textarea
                name="note"
                value={data.note.value}
                label="Примечание"
                resize="auto"
                onChange={handleChange}
            />
        </Form>
    );
});

export default ClientForm;