import { useCallback } from 'react';

import { useFormData } from 'shared/hooks/form';
import Form from 'shared/components/form';
import FormInput from 'shared/components/form-input';
import FormCheckbox from 'shared/components/form-checkbox';

import './index.scss';

const defaultRoom = {
    title: '',
    login: '',
    password: 4,
    active: true
};

export default function RoomForm({ room = {}, onSubmit, ...props }) {
    const { data, handleChange } = useFormData({
        ...defaultRoom,
        ...room
    });

    const handleSubmit = useCallback(() => {
        onSubmit(data);
    }, [data]);

    return (
        <Form className="room-form" onSubmit={handleSubmit} {...props}>
            <FormInput
                name="title"
                value={data.title}
                label="Название"
                fluid
                onChange={handleChange}
            />

            <FormInput
                name="login"
                value={data.login}
                label="Логин"
                fluid
                onChange={handleChange}
            />

            <FormInput
                name="password"
                value={data.password}
                label="Пароль"
                fluid
                onChange={handleChange}
            />

            <FormCheckbox
                name="active"
                checked={data.active}
                label="Работает"
                toggle
                onChange={handleChange}
            />
        </Form>
    );
}