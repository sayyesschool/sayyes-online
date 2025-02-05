import { useCallback, useState } from 'react';

import CopyButton from 'shared/components/copy-button';
import { Alert, Form, IconButton, Input } from 'shared/ui-components';
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

            <Alert
                content="Не забудьте скопировать пароль для отправки пользователю"
                color="warning"
                end={
                    <CopyButton
                        copyContent={password}
                        size="sm"
                        color="warning"
                    />
                }
            />
        </Form>
    );
}