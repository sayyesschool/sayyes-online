import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import TimeZoneSelect from 'shared/components/timezone-select';
import { genderOptions, userDomainOptions } from 'shared/data/user';
import { useFormData } from 'shared/hooks/form';
import datetime from 'shared/libs/datetime';
import { Flex, Form } from 'shared/ui-components';

const getFormData = ({
    firstname = '',
    lastname = '',
    patronym = '',
    email = '',
    gender = '',
    dob = '',
    phone = '',
    altPhone = '',
    timezone = '',
    note = '',
    data: {
        hhid = '',
        address = '',
        occupation = '',
        interests = ''
    },
    domains = ['lk', 'lms']
} = {
    data: {},
    domains: []
}) => ({
    hhid,
    firstname,
    lastname,
    patronym,
    email,
    gender,
    dob: dob ? datetime(dob).format('YYYY-MM-DD') : '',
    phone,
    altPhone,
    address,
    occupation,
    interests,
    timezone,
    note,
    domains
});

const LearnerForm = forwardRef(({
    learner,
    onSubmit,
    ...props
}, ref) => {
    const formRef = useRef();

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    const { data, handleChange } = useFormData(
        getFormData(learner),
        [learner?.id]
    );

    const handleSubmit = useCallback(() => {
        onSubmit({
            ...data,
            data: {
                hhid: data.hhid,
                address: data.address,
                occupation: data.occupation,
                interests: data.interests
            }
        });
    }, [data, onSubmit]);

    return (
        <Form
            ref={formRef}
            className="LearnerForm"
            onSubmit={handleSubmit}
            {...props}
        >
            <Form.Input
                name="hhid"
                value={data.hhid}
                label="Hollihop ID"
                onChange={handleChange}
            />

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
                onChange={handleChange}
            />

            <Form.Input
                type="phone"
                name="altPhone"
                value={data.altPhone}
                label="Дополнительный телефон"
                onChange={handleChange}
            />

            <Form.Input
                type="email"
                name="email"
                value={data.email}
                label="Электронная почта"
                onChange={handleChange}
            />

            <Form.RadioGroup
                name="gender"
                value={data.gender}
                label="Пол"
                items={genderOptions}
                onChange={handleChange}
            />

            {learner?.id &&
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
});

LearnerForm.displayName = 'LearnerForm';

export default LearnerForm;