import React from 'react';
import {
    Card,
    IconButton
} from 'mdc-react';

import MeetingForm from 'app/components/meetings/meeting-form';

import './index.scss';

export default function MeetingDetails({ meeting, onUpdate }) {
    return (
        <section className="meeting-details">
            <Card outlined>
                <Card.Header
                    title="Детали"
                    actions={
                        <IconButton
                            icon="save"
                            type="submit"
                            form="meeting-form"
                            title="Сохранить"
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
        </section>
    );
}