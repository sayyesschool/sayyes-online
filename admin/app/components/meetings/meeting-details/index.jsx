import {
    Card,
    IconButton
} from 'mdc-react';

import MeetingForm from '../meeting-form';

export default function MeetingDetails({ meeting, onUpdate }) {
    return (
        <Card outlined>
            <Card.Header
                title="Детали"
                actions={
                    <IconButton
                        icon="save"
                        type="submit"
                        form="meeting-form"
                    />
                }
            />

            <Card.Section primary>
                <MeetingForm
                    meeting={meeting}
                    onSubmit={onUpdate}
                />
            </Card.Section>
        </Card>
    );
}