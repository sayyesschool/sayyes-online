import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useMeetings } from 'shared/hooks/meetings';
import { useTeachers } from 'shared/hooks/teachers';
import { Tabs } from 'shared/ui-components';

import MeetingForm from 'crm/components/meetings/meeting-form';
import MeetingsTable from 'crm/components/meetings/meetings-table';

const filters = {
    upcoming: meeting => new Date(meeting.date) > new Date(),
    ended: meeting => new Date(meeting.date) < new Date(),
    all: () => true
};

export default function MeetingsPage() {
    const [meetings, actions] = useMeetings();
    const [teachers] = useTeachers();

    const [tab, setTab] = useState('upcoming');
    const [meeting, setMeeting] = useState();
    const [isLoading, setLoading] = useState(false);
    const [isFormOpen, setFormOpen] = useState(false);

    const handleSubmit = useCallback(data => {
        setLoading(true);

        return actions.createMeeting(data)
            .then(() => setFormOpen(false))
            .finally(() => setLoading(false));
    }, [actions]);

    const handlePublish = useCallback(meeting => {
        setLoading(true);

        return actions.updateMeeting(meeting.id, { published: !meeting.published })
            .finally(() => setLoading(false));
    }, [actions]);

    const handleEdit = useCallback(meeting => {
        setMeeting(meeting);
        setFormOpen(true);
    }, []);

    const handleDelete = useCallback(meeting => {
        setLoading(true);

        return actions.deleteMeeting(meeting.id).finally(() => setLoading(false));
    }, [actions]);

    const handleFormClose = useCallback(() => {
        setMeeting();
        setFormOpen(false);
    }, []);

    if (!meetings) return <LoadingIndicator />;

    const filteredMeetings = meetings?.slice()
        .sort((a, b) => tab === 'ended'
            ? new Date(b.date) - new Date(a.date)
            : new Date(a.date) - new Date(b.date)
        )
        .filter(filters[tab]);

    return (
        <Page id="meetings-page">
            <Page.Header
                title="Встречи"
                actions={[{
                    key: 'add',
                    icon: 'add',
                    content: 'Создать встречу',
                    variant: 'solid',
                    onClick: () => setFormOpen(true)
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

                <Page.Section
                    variant="outlined"
                    compact
                    scrollable
                >
                    <MeetingsTable
                        meetings={filteredMeetings}
                        onEdit={handleEdit}
                        onPublish={handlePublish}
                        onDelete={handleDelete}
                    />
                </Page.Section>
            </Page.Content>

            <FormDialog
                title={meeting?.id ? 'Изменить встречу' : 'Новая встреча'}
                open={isFormOpen}
                onClose={handleFormClose}
            >
                <MeetingForm
                    id="meeting-form"
                    meeting={meeting}
                    hosts={teachers}
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </Page>
    );
}