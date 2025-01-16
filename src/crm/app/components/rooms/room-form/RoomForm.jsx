import { useCallback } from 'react';

import { useFormData } from 'shared/hooks/form';
import Form from 'shared/ui-components/form';

const defaultRoom = {
    title: '',
    login: '',
    password: '',
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
        <Form
            className="room-form"
            onSubmit={handleSubmit}
            {...props}
        >
            <Form.Input
                label="Название"
                name="title"
                value={data.title}
                onChange={handleChange}
            />

            <Form.Input
                label="Логин"
                name="login"
                value={data.login}
                onChange={handleChange}
            />

            <Form.Input
                label="Пароль"
                name="password"
                value={data.password}
                onChange={handleChange}
            />

            <Form.Checkbox
                label="Работает"
                name="active"
                checked={data.active}
                toggle
                onChange={handleChange}
            />
        </Form>
    );
}