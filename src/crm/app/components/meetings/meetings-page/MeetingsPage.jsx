import { useCallback, useEffect, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import { Tabs } from 'shared/ui-components';

import MeetingForm from 'crm/components/meetings/meeting-form';
import MeetingsTable from 'crm/components/meetings/meetings-table';
import { useStore } from 'crm/hooks/store';

export default function MeetingsPage() {
    const [meetings, actions] = useStore('meetings.list');
    const [teachers] = useStore('teachers.list');

    const [isMeetingFormOpen, setMeetingFormOpen] = useState(false);
    const [tab, setTab] = useState('upcoming');

    useEffect(() => {
        actions.getMeetings();
    }, [actions]);

    const handleSubmit = useCallback(data => {
        actions.createMeeting(data)
            .then(() => setMeetingFormOpen(false));
    }, [actions]);

    const sortedMeetings = meetings?.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    const filteredMeetings = sortedMeetings?.filter(filters[tab]);

    return (
        <Page id="meetings-page" loading={!meetings}>
            <Page.Header
                title="Встречи"
                actions={[{
                    key: 'add',
                    icon: 'add',
                    content: 'Создать встречу',
                    variant: 'solid',
                    onClick: () => setMeetingFormOpen(true)
                }]}
            />

            <Page.Content>
                <Tabs
                    value={tab}
                    items={[
                        { key: 'upcoming', value: 'upcoming', content: 'Предстоящие' },
                        { key: 'ended', value: 'ended', content: 'Прошедшие' },
                        { key: 'all', value: 'all', content: 'Все' }
                    ]}
                    onChange={(_, value) => setTab(value)}
                />

                <Page.Section variant="outlined" compact>
                    <MeetingsTable
                        meetings={filteredMeetings}
                    />
                </Page.Section>
            </Page.Content>

            <FormDialog
                form="meeting-form"
                title="Новая встреча"
                open={isMeetingFormOpen}
                modal
                onClose={() => setMeetingFormOpen(false)}
            >
                <MeetingForm
                    hosts={teachers}
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </Page>
    );
}

const filters = {
    upcoming: meeting => new Date(meeting.date) > new Date(),
    ended: meeting => new Date(meeting.date) < new Date(),
    all: () => true
};