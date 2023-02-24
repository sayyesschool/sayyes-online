import { useCallback, useState } from 'react';

import Form from 'shared/ui-components/form';

export default function ProfileForm({ user, onSubmit, ...props }) {
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);

    const handleSubmit = useCallback(event => {
        event.preventDefault();

        onSubmit({
            firstname,
            lastname,
            email
        });
    }, []);

    return (
        <Form id="profile-form" onSubmit={handleSubmit} {...props}>
            <Form.Input
                label="Имя"
                name="firstname"
                value={firstname}
                required
                onChange={setFirstname}
            />

            <Form.Input
                label="Фамилия"
                name="lastname"
                value={lastname}
                required
                onChange={setLastname}
            />

            <Form.Input
                label="Электронная почта"
                type="email"
                name="email"
                value={email}
                required
                onChange={setEmail}
            />
        </Form>
    );
}