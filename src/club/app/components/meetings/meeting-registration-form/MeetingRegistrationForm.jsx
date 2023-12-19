import { useRef, useState, useCallback } from 'react';

import { Checkbox, Flex, Form, Input } from 'shared/components/ui';

export default function MeetingRegistrationForm({
    meeting,
    user,
    onSubmit,
    ...props
}) {
    const textFieldRef = useRef();

    const [isConfirmed, setConfirmed] = useState(true);

    const handleSubmit = useCallback(event => {
        event.preventDefault();
        onSubmit(meeting);
    }, [meeting, onSubmit]);

    const amount = (meeting?.price - user?.balance) || undefined;

    return (
        <Form id="balance-form"  onSubmit={handleSubmit} {...props}>
            {meeting &&
                <input type="hidden" name="meetingId" defaultValue={meeting.id} />
            }

            <Flex dir="column" gap="medium">
                <Input
                    ref={textFieldRef}
                    type="number"
                    name="amount"
                    defaultValue={amount}
                    min="0"
                    placeholder="Сумма"
                    end="руб."
                    filled
                />

                <Checkbox
                    name="confirm"
                    label="Я согласен/на с условиями предоставления услуг и политикой конфиденциальности."
                    checked={isConfirmed}
                    size="sm"
                    required
                    onChange={() => setConfirmed(!isConfirmed)}
                />
            </Flex>
        </Form>
    );
}