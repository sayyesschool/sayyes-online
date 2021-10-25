import { useCallback, useState } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';

import Form from 'shared/components/form';

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
            <Layout column>
                <TextField
                    type="text"
                    name="firstname"
                    value={firstname}
                    label="Имя"
                    filled
                    required
                    onChange={setFirstname}
                />

                <TextField
                    type="text"
                    name="lastname"
                    value={lastname}
                    label="Фамилия"
                    filled
                    required
                    onChange={setLastname}
                />

                <TextField
                    type="email"
                    name="email"
                    value={email}
                    label="Электронная почта"
                    filled
                    required
                    onChange={setEmail}
                />
            </Layout>
        </Form>
    );
}