import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { Grid } from 'shared/components/ui';
import { useMeetings } from 'shared/hooks/meetings';
import { useUser } from 'shared/hooks/user';

import MeetingCard from 'club/components/meetings/meeting-card';
import MeetingRegistrationForm from 'club/components/meetings/meeting-registration-form';
// import LevelAlert from 'club/components/shared/level-alert';

export default function LearnerPage() {
    const [user] = useUser();
    const [meetings, actions] = useMeetings();

    const [meeting, setMeeting] = useState();

    const handleRegister = useCallback(meeting => {
        if (meeting.isRegistered || meeting.isPending) {
            actions.unregisterFromMeeting(meeting.id);
        } else if (meeting.free || user.balance >= meeting.price) {
            actions.registerForMeeting(meeting.id)
                .then(() => setMeeting());
        } else {
            setMeeting(meeting);
        }
    }, [user, actions]);

    if (!meetings) return <LoadingIndicator fullscreen />;

    const registeredMeetings = meetings.filter(meeting =>
        meeting.registrations.some(reg => reg.userId === user.id)
    );
    const unregisteredMeetings = meetings.filter(meeting =>
        !meeting.registrations.some(reg => reg.userId === user.id)
    );
    const hasFutureMeetings = unregisteredMeetings.length > 0;

    return (
        <Page
            className="HomePage LearnerPage"
            title="Разговорный клуб"
        >
            <Page.Header
                title="Разговорный клуб"
            />

            <Page.Content>
                {/* {hasFutureMeetings &&
                    <LevelAlert />
                } */}

                {registeredMeetings.length > 0 &&
                    <Page.Section
                        title="Мои встречи"
                        compact
                        plain
                    >
                        <Grid spacing={2}>
                            {registeredMeetings.map(meeting =>
                                <Grid.Item key={meeting.id} md={4}>
                                    <MeetingCard
                                        meeting={meeting}
                                        registered
                                        onRegister={handleRegister}
                                    />
                                </Grid.Item>
                            )}
                        </Grid>
                    </Page.Section>
                }

                <Page.Section
                    title="Предстоящие встречи"
                    description={!hasFutureMeetings && 'Встреч пока не запланировано'}
                    compact
                    plain
                >
                    <Grid spacing={2}>
                        {unregisteredMeetings.map(meeting =>
                            <Grid.Item key={meeting.id} md={4}>
                                <MeetingCard
                                    meeting={meeting}
                                    onRegister={handleRegister}
                                />
                            </Grid.Item>
                        )}
                    </Grid>
                </Page.Section>
            </Page.Content>

            <FormDialog
                title="Для записи на встречу необходимо пополнить баланс."
                open={!!meeting}
                submitButtonText="Пополнить"
                onClose={() => setMeeting()}
            >
                <MeetingRegistrationForm
                    meeting={meeting}
                    user={user}
                    onSubmit={handleRegister}
                />
            </FormDialog>
        </Page>
    );
}