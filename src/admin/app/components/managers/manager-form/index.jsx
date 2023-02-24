import { forwardRef, useImperativeHandle, useRef } from 'react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/ui-components/form';
import TimeZoneSelect from 'shared/components/timezone-select';

const defaultManager = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    timezone: '',
    note: ''
};

export default forwardRef(ManagerForm);

function ManagerForm({ manager = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    const { data, handleChange } = useForm({
        ...defaultManager,
        ...manager,
        requests: undefined,
        enrollments: undefined,
        payments: undefined
    });

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    return (
        <Form ref={formRef} className="manager-form" onSubmit={() => onSubmit(data)} {...props}>
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
                label="Телефон"
                type="phone"
                name="phone"
                value={data.phone}
                required
                onChange={handleChange}
            />

            <Form.Input
                label="Электронная почта"
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
            />

            <Form.Input
                label="Дата рождения"
                type="date"
                name="dob"
                value={data.dob ? moment(data.dob).format('YYYY-MM-DD') : ''}
                onChange={handleChange}
            />

            <TimeZoneSelect
                name="timezone"
                value={data.timezone}
                onChange={handleChange}
            />

            <Form.RadioGroup
                label="Пол"
                name="gender"
                value={data.gender}
                items={[
                    { value: 'male', label: 'Мужской' },
                    { value: 'female', label: 'Женский' }
                ]}
                onChange={handleChange}
            />

            <Form.Textarea
                label="Примечание"
                name="note"
                value={data.note}
                onChange={handleChange}
            />
        </Form>
    );
}