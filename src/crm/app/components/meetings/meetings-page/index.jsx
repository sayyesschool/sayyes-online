import { useCallback, useEffect, useState } from 'react';

import Page from 'shared/components/page';

import MeetingForm from 'crm/components/meetings/meeting-form';
import MeetingsTable from 'crm/components/meetings/meetings-table';
import FormPanel from 'crm/components/shared/form-panel';
import { useStore } from 'crm/hooks/store';

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

    const meetings = state?.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <Page id="meetings-page" loading={!meetings}>
            <Page.Header
                title="Встречи"
                toolbar={[
                    {
                        key: 'add',
                        label: 'Создать',
                        icon: 'add',
                        onClick: () => setMeetingFormOpen(true)
                    }
                ]}
            />

            <Page.Content>
                <MeetingsTable
                    meetings={meetings}
                />
            </Page.Content>

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