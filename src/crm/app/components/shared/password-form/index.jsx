import { useCallback, useState } from 'react';

import { Checkbox, Form, Input, IconButton } from 'shared/ui-components';
import { generatePassword } from 'shared/utils/password';

export default function PasswordForm({ onSubmit, ...props }) {
    const [password, setPassword] = useState(generatePassword());

    const handleChange = useCallback(event => {
        setPassword(event.target.value);
    }, []);

    const handleClick = useCallback(() => {
        setPassword(generatePassword());
    }, []);


    const handleSubmit = useCallback(() => {
        onSubmit(password);
    }, [password, onSubmit]);

    return (
        <Form
            className="PasswordForm"
            onSubmit={handleSubmit}
            {...props}
        >
            <Input
                type="text"
                name="password"
                value={password}
                autoComplete="off"
                endDecorator={
                    <IconButton
                        icon="sync_lock"
                        color="neutral"
                        size="sm"
                        variant="plain"
                        onClick={handleClick}
                    />
                }
                onChange={handleChange}
            />

            <Checkbox
                label="Я сохранил/ла пароль для отправки пользователю."
                required
            />
        </Form>
    );
}