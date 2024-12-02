import React from 'react';

import Page from 'shared/components/page';
import { IconButton } from 'shared/ui-components';

import MeetingForm from 'crm/components/meetings/meeting-form';

import styles from './MeetingDetails.module.scss';

export default function MeetingDetails({ meeting, hosts, onUpdate }) {
    return (
        <Page.Section
            className={styles.root}
            title="Детали"
            actions={
                <IconButton
                    icon="save"
                    type="submit"
                    form="meeting-form"
                    title="Сохранить"
                />
            }
        >
            <MeetingForm
                meeting={meeting}
                hosts={hosts}
                onSubmit={onUpdate}
            />
        </Page.Section>
    );
}