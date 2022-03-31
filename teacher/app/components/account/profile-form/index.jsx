import { useCallback, useState } from 'react';

import Form from 'shared/components/form';
import FormInput from 'shared/components/form-input';

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
            <FormInput
                name="firstname"
                value={firstname}
                label="Имя"
                fluid
                required
                onChange={setFirstname}
            />

            <FormInput
                name="lastname"
                value={lastname}
                label="Фамилия"
                fluid
                required
                onChange={setLastname}
            />

            <FormInput
                type="email"
                name="email"
                value={email}
                label="Электронная почта"
                fluid
                required
                onChange={setEmail}
            />
        </Form>
    );
}