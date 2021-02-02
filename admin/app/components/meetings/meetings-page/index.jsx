import React, { useState, useEffect, useCallback } from 'react';

import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import FormPanel from 'app/components/shared/form-panel';
import MeetingsTable from 'app/components/meetings/meetings-table';
import MeetingForm from 'app/components/meetings/meeting-form';

export default function MeetingsPage() {
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
        <Page id="meetings-page" loading={!meetings}>
            <PageTopBar
                title="Встречи"
                actions={[
                    {
                        key: 'add',
                        label: 'Создать',
                        icon: 'add',
                        unelevated: true,
                        onClick: () => setMeetingFormOpen(true)
                    }
                ]}
            />

            <PageContent>
                <MeetingsTable
                    meetings={meetings}
                />
            </PageContent>

            <FormPanel
                form="meeting-form"
                title="Новая встреча"
                open={isMeetingFormOpen}
                modal
                onClose={() => setMeetingFormOpen(false)}
            >
                <MeetingForm
                    onSubmit={handleSubmit}
                />
            </FormPanel>
        </Page>
    );
}