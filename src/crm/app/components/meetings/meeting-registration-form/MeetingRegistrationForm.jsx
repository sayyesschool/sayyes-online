import { useCallback, useState } from 'react';

import UserSearch from 'shared/components/user-search';
import { Checkbox } from 'shared/ui-components';
import Form from 'shared/ui-components/form';

export default function MeetingRegistrationForm({ onSubmit }) {
    const [userId, setUserId] = useState();
    const [notify, setNotify] = useState(false);

    const handleSubmit = useCallback(() => {
        onSubmit({ userId, notify });
    }, [userId, notify, onSubmit]);

    const handleResult = useCallback(userId => {
        setUserId(userId);
    }, []);

    return (
        <Form id="meeting-registration-form" onSubmit={handleSubmit}>
            <UserSearch onResult={handleResult} />

            <Checkbox
                label="Отправить письмо с регистрацией на встречу"
                value={notify}
                onChange={() => setNotify(v => !v)}
            />
        </Form>
    );
}