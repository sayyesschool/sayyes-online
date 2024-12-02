import { useState } from 'react';

import Page from 'shared/components/page';
import { useMeetings } from 'shared/hooks/meetings';
import datetime from 'shared/libs/datetime';

import MeetingsList from 'club/components/meetings/meetings-list';
import HelpDialog from 'club/components/shared/help-dialog';

export default function TeacherPage() {
    const [meetings] = useMeetings();

    const [isHelpDialogOpen, setHelpDialogOpen] = useState(false);

    const today = new Date();
    const scheduledMeetings = meetings.filter(m => datetime(m.date).isSameOrAfter(today, 'day'));
    const pastMeetings = meetings.filter(m => datetime(m.date).isBefore(today, 'day'));

    return (
        <Page
            className="TeacherPage HomePage"
            title="My meetings"
            actions={[
                {
                    key: 'help',
                    as: 'a',
                    href: 'https://1drv.ms/p/s!Aj2uTCTzkGRAg5taUJktj1DUzY_QEg',
                    target: '_blank',
                    icon: 'file_present'
                }
            ]}
        >
            <Page.Section
                title="Scheduled meetings"
                description={scheduledMeetings.length === 0 && 'No scheduled meetings yet.'}
            >
                <MeetingsList meetings={scheduledMeetings} />
            </Page.Section>

            <Page.Section
                title="Past meetings"
                description={pastMeetings.length === 0 && 'No past meetings yet.'}
            >
                <MeetingsList meetings={scheduledMeetings} />
            </Page.Section>

            <HelpDialog
                open={isHelpDialogOpen}
                onClose={() => setHelpDialogOpen(false)}
            />
        </Page>
    );
}