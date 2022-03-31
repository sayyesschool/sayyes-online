import { forwardRef, useImperativeHandle, useRef } from 'react';
import {
    Form, FormInput, FormRadioGroup, FormTextArea
} from '@fluentui/react-northstar';
import moment from 'moment';

import { useFormData } from 'shared/hooks/form';
import TimeZoneSelect from 'shared/components/timezone-select';

const defaultClient = {
    hhid: '',
    firstname: '',
    lastname: '',
    patronym: '',
    email: '',
    gender: '',
    phone: '',
    altPhone: '',
    address: '',
    occupation: '',
    interests: '',
    timezone: '',
    note: ''
};

const genderOptions = [
    { key: 'male', value: 'male', label: 'Мужской' },
    { key: 'female', value: 'female', label: 'Женский' }
];

export default forwardRef(ClientForm);

function ClientForm({ client = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    const { data, handleChange } = useFormData({
        ...defaultClient,
        ...client,
        requests: undefined,
        enrollments: undefined,
        payments: undefined,
        lessons: undefined
    }, [client?.id]);

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
                fluid
                onChange={handleChange}
            />

            <FormInput
                name="firstname"
                value={data.firstname}
                label="Имя"
                fluid
                required
                onChange={handleChange}
            />

            <FormInput
                name="lastname"
                value={data.lastname}
                label="Фамилия"
                fluid
                onChange={handleChange}
            />

            <FormInput
                name="patronym"
                value={data.patronym}
                label="Отчество"
                fluid
                onChange={handleChange}
            />

            <FormInput
                type="phone"
                name="phone"
                value={data.phone}
                label="Телефон"
                required
                fluid
                onChange={handleChange}
            />

            <FormInput
                type="phone"
                name="altPhone"
                value={data.altPhone}
                label="Дополнительный телефон"
                fluid
                onChange={handleChange}
            />

            <FormInput
                type="email"
                name="email"
                value={data.email}
                label="Электронная почта"
                fluid
                onChange={handleChange}
            />

            <FormRadioGroup
                name="gender"
                value={data.gender}
                label="Пол"
                items={genderOptions}
                vertical
                onChange={handleChange}
            />

            {client?.id &&
                <>
                    <FormInput
                        type="date"
                        name="dob"
                        value={data.dob ? moment(data.dob).format('YYYY-MM-DD') : ''}
                        label="Дата рождения"
                        fluid
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
                        fluid
                        textarea
                        onChange={handleChange}
                    />

                    <FormInput
                        type="text"
                        name="occupation"
                        value={data.occupation}
                        label="Род деятельности"
                        fluid
                        textarea
                        onChange={handleChange}
                    />

                    <FormInput
                        type="text"
                        name="interests"
                        value={data.interests}
                        label="Интересы"
                        fluid
                        textarea
                        onChange={handleChange}
                    />
                </>
            }

            <FormTextArea
                name="note"
                value={data.note}
                label="Примечание"
                resize="vertical"
                fluid
                onChange={handleChange}
            />
        </Form>
    );
}