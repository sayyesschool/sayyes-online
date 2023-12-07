import { useRef, useState, useCallback } from 'react';
import { Text } from 'shared/ui-components';
import Form from 'shared/components/form';

import './index.scss';

export default function MeetingRegistrationForm({
    account,
    meeting,
    onSubmit,
    ...props
}) {
    const textFieldRef = useRef();

    const [isConfirmed, setConfirmed] = useState(true);

    const handleSubmit = useCallback(event => {
        event.preventDefault();
        onSubmit();
    }, [onSubmit]);

    const amount = (meeting?.price - account?.balance) || 0;

    return (
        <Form id="balance-form"  onSubmit={handleSubmit} {...props}>
            <Text>Для записи на встречу необходимо пополнить баланс.</Text>

            {meeting &&
                <input type="hidden" name="meetingId" defaultValue={meeting.id} />
            }

            <Form.Input
                ref={textFieldRef}
                type="number"
                name="amount"
                defaultValue={amount}
                min="0"
                label="Сумма"
                suffix="руб."
                filled
            />

            <Form.Field label="Я согласен/на с условиями предоставления услуг и политикой конфиденциальности.">
                <Form.Checkbox
                    name="confirm"
                    checked={isConfirmed}
                    required
                    onChange={() => setConfirmed(!isConfirmed)}
                />
            </Form.Field>
        </Form>
    );
}