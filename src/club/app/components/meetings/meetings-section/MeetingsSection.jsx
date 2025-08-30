import { useCallback, useState } from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { Dialog, Flex, Grid, Heading, Tabs } from 'shared/components/ui';
import { useMeetings } from 'shared/hooks/meetings';
import { sortByDateAsc, sortByDateDesc } from 'shared/utils/sort';

import MeetingCard from 'club/components/meetings/meeting-card';

export default function MeetingsSection({ ...props }) {
    const [meetings, actions] = useMeetings();

    const [meeting, setMeeting] = useState();
    const [tab, setTab] = useState('scheduled');

    const handleRegister = useCallback(meeting => {
        if (meeting.isRegistered || meeting.isPending) {
            return actions.unregisterFromMeeting(meeting.id);
        } else {
            return actions.registerForMeeting(meeting.id);
        }
    }, [actions]);

    if (!meetings) return <LoadingIndicator fullscreen />;

    const startedMeeting = meetings.find(m => m.isRegistered && m.isStarted);
    const registeredMeetings = meetings.filter(m => m.isRegistered && m.isScheduled).sort(sortMeetingByDateAsc);
    const scheduledMeetings = meetings.filter(m => !m.isRegistered && m.isScheduled).sort(sortMeetingByDateAsc);
    const pastMeetings = meetings.filter(m => m.isEnded).sort(sortMeetingByDateDesc);
    const filteredMeetings = tab === 'scheduled' ? scheduledMeetings : pastMeetings;

    return (
        <Page.Section
            title="Встречи"
            compact
            plain
            {...props}
        >
            <Flex dir="column" gap="larger">
                {startedMeeting &&
                    <Flex dir="column" gap="small">
                        <Heading type="title-md" content="Текущая встреча" />

                        <MeetingCard
                            meeting={startedMeeting}
                            orientation="horizontal"
                            onView={() => setMeeting(startedMeeting)}
                        />
                    </Flex>
                }

                {registeredMeetings.length > 0 &&
                    <Flex dir="column" gap="small">
                        <Heading type="title-md" content="Ваши встречи" />

                        <Grid spacing={2}>
                            {registeredMeetings.map(meeting =>
                                <Grid.Item key={meeting.id} md={4}>
                                    <MeetingCard
                                        meeting={meeting}
                                        onView={() => setMeeting(meeting)}
                                        onRegister={handleRegister}
                                    />
                                </Grid.Item>
                            )}
                        </Grid>
                    </Flex>
                }

                {filteredMeetings.length > 0 &&
                    <Flex dir="column" gap="small">
                        <Tabs
                            value={tab}
                            items={[
                                { value: 'scheduled', content: 'Предстоящие' },
                                { value: 'past', content: 'Прошедшие' }
                            ]}
                            disableUnderline
                            onChange={(_, value) => setTab(value)}
                        />

                        <Grid spacing={2}>
                            {filteredMeetings.map(meeting =>
                                <Grid.Item key={meeting.id} md={4}>
                                    <MeetingCard
                                        meeting={meeting}
                                        onView={() => setMeeting(meeting)}
                                        onRegister={handleRegister}
                                    />
                                </Grid.Item>
                            )}
                        </Grid>
                    </Flex>
                }
            </Flex>

            <Dialog
                open={!!meeting} sx={{ padding: 0 }}
                onClose={() => setMeeting()}
            >
                <MeetingCard
                    meeting={meeting}
                    sx={{ boxShadow: 'none' }}
                    showDescription
                    onRegister={handleRegister}
                />
            </Dialog>
        </Page.Section>
    );
}

function sortMeetingByDateAsc(a, b) {
    return sortByDateAsc(a.startDate, b.startDate);
}

function sortMeetingByDateDesc(a, b) {
    return sortByDateDesc(a.startDate, b.startDate);
}