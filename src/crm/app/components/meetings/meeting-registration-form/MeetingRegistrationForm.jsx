import { useCallback, useState } from 'react';

import UserSearch from 'shared/components/user-search';
import { Checkbox } from 'shared/ui-components';
import Form from 'shared/ui-components/form';

export default function MeetingRegistrationForm({ onSubmit, ...props }) {
    const [userId, setUserId] = useState();
    const [force, setForce] = useState(false);
    const [notify, setNotify] = useState(false);

    const handleSubmit = useCallback(() => {
        onSubmit({ userId, force, notify });
    }, [userId, force, notify, onSubmit]);

    const handleResult = useCallback(userId => {
        setUserId(userId);
    }, []);

    return (
        <Form onSubmit={handleSubmit} {...props}>
            <UserSearch onResult={handleResult} />

            <Checkbox
                label="Требуется абонемент"
                checked={!force}
                onChange={() => setForce(v => !v)}
            />

            <Checkbox
                label="Отправить письмо с регистрацией на встречу"
                checked={notify}
                onChange={() => setNotify(v => !v)}
            />
        </Form>
    );
}