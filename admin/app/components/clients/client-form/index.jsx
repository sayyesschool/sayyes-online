import { forwardRef, useImperativeHandle, useRef } from 'react';
import moment from 'moment';

import { useFormData } from 'shared/hooks/form';
import Form from 'shared/components/form';
import FormInput from 'shared/components/form-input';
import FormRadioGroup from 'shared/components/form-radio-group';
import FormTextArea from 'shared/components/form-textarea';
import TimeZoneSelect from 'shared/components/timezone-select';

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

export default forwardRef(ClientForm);

function ClientForm({ client = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    const { data, handleChange } = useFormData(getFormData(client), [client?.id]);

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    return (
        <Form ref={formRef} className="client-form" onSubmit={() => onSubmit(data)} {...props}>
            <FormInput
                type="text"
                name="hhid"
                value={data.hhid}
                label="Hollihop ID"
                onChange={handleChange}
            />

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
                type="phone"
                name="altPhone"
                value={data.altPhone}
                label="Дополнительный телефон"
                onChange={handleChange}
            />

            <FormInput
                type="email"
                name="email"
                value={data.email}
                label="Электронная почта"
                onChange={handleChange}
            />

            <FormRadioGroup
                name="gender"
                value={data.gender}
                label="Пол"
                items={genderOptions}
                onChange={handleChange}
            />

            {client?.id &&
                <>
                    <FormInput
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

                    <FormInput
                        type="text"
                        name="address"
                        value={data.address}
                        label="Адрес"
                        onChange={handleChange}
                    />

                    <FormInput
                        type="text"
                        name="occupation"
                        value={data.occupation}
                        label="Род деятельности"
                        onChange={handleChange}
                    />

                    <FormInput
                        type="text"
                        name="interests"
                        value={data.interests}
                        label="Интересы"
                        onChange={handleChange}
                    />
                </>
            }

            <FormTextArea
                name="note"
                value={data.note}
                label="Примечание"
                resize="auto"
                onChange={handleChange}
            />
        </Form>
    );
}