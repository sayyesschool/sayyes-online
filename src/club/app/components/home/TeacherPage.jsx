import { useCallback, useState } from 'react';

import { Dialog, Flex, Tabs } from '@/shared/ui-components';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useMeetings } from 'shared/hooks/meetings';
import useUser from 'shared/hooks/user';
import datetime from 'shared/libs/datetime';

import MeetingDetails from 'club/components/meetings/meeting-details';
import MeetingsTable from 'club/components/meetings/meetings-table';
import HelpDialog from 'club/components/shared/help-dialog';

export default function TeacherPage() {
    const [user] = useUser();
    const [meetings] = useMeetings(`?hostId=${user.id}`);

    const [tab, setTab] = useState('scheduled');
    const [isHelpDialogOpen, setHelpDialogOpen] = useState(false);
    const [meeting, setMeeting] = useState(null);

    const handleStartMeeting = useCallback(meeting => {
        window.open(`/api/meetings/${meeting.id}/start`, '_blank');
    }, []);

    const handleViewMeeting = useCallback(meeting => {
        setMeeting(meeting);
    }, []);

    if (!meetings) return <LoadingIndicator fullscreen />;

    const today = new Date();
    const scheduledMeetings = meetings.filter(m => datetime(m.date).isSameOrAfter(today, 'day'));
    const pastMeetings = meetings.filter(m => datetime(m.date).isBefore(today, 'day'));
    const filteredMeetings = tab === 'scheduled' ? scheduledMeetings : pastMeetings;

    return (
        <Page className="TeacherPage HomePage">
            <Page.Header
                title="Мои встречи"
                // actions={[
                //     {
                //         key: 'help',
                //         as: 'a',
                //         content: 'Help',
                //         variant: 'plain',
                //         href: 'https://1drv.ms/p/s!Aj2uTCTzkGRAg5taUJktj1DUzY_QEg',
                //         target: '_blank',
                //         icon: 'file_present'
                //     }
                // ]}
            />

            <Page.Content>
                <Flex dir="column" gap="small">
                    <Tabs
                        value={tab}
                        items={[
                            { value: 'scheduled', content: 'Предстоящие' },
                            { value: 'past', content: 'Прошедшие' }
                        ]}
                        onChange={(_, value) => setTab(value)}
                    />

                    <Page.Section compact elevated>
                        <MeetingsTable
                            meetings={filteredMeetings}
                            onView={handleViewMeeting}
                            onStart={handleStartMeeting}
                        />
                    </Page.Section>
                </Flex>
            </Page.Content>

            <Dialog
                open={!!meeting}
                onClose={() => setMeeting(null)}
            >
                {meeting && (
                    <MeetingDetails
                        meeting={meeting}
                        onClose={() => setMeeting(null)}
                    />
                )}
            </Dialog>

            <HelpDialog
                open={isHelpDialogOpen}
                onClose={() => setHelpDialogOpen(false)}
            />
        </Page>
    );
}