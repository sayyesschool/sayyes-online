import React, { useState, useEffect, useCallback } from 'react';

import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/store';
import FormPanel from 'app/components/shared/form-panel';
import MeetingTable from 'app/components/meetings/meeting-table';
import MeetingForm from 'app/components/meetings/meeting-form';

export default function Meetings() {
    const [meetings, actions] = useStore('meetings.list');

    const [isMeetingFormOpen, setMeetingFormOpen] = useState(false);

    useEffect(() => {
        actions.getMeetings();
    }, []);

    const handleSubmit = useCallback(data => {
        actions.createMeeting(data)
            .then(() => setMeetingFormOpen(false));
    }, []);

    return (
        <Page id="meetings" loading={!meetings}>
            <PageHeader
                title="Встречи"
                actions={[
                    {
                        key: 'add',
                        label: 'Создать',
                        icon: 'add',
                        outlined: true,
                        onClick: () => setMeetingFormOpen(true)
                    }
                ]}
            />

            <PageContent>
                <MeetingTable
                    meetings={meetings}
                />
            </PageContent>

            <FormPanel
                title="Новая встреча"
                open={isMeetingFormOpen}
                form="meeting-form"
                onClose={() => setMeetingFormOpen(false)}
            >
                <MeetingForm
                    onSubmit={handleSubmit}
                />
            </FormPanel>
        </Page>
    );
}