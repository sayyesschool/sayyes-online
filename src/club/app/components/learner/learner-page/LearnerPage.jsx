import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { Alert, Button, Grid, Text } from 'shared/components/ui';
import { useMeetings } from 'shared/hooks/meetings';
import { useUser } from 'shared/hooks/user';

import LevelDialog from 'club/components/learner/level-dialog';
import MeetingCard from 'club/components/learner/meeting-card';
import MeetingRegistrationForm from 'club/components/meetings/meeting-registration-form/index';

export default function LearnerPage() {
    const [user] = useUser();
    const [meetings, actions] = useMeetings();

    const [meeting, setMeeting] = useState();
    const [isLevelDialogOpen, setLevelDialogOpen] = useState(false);

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

    const registeredMeetings = meetings.filter(meeting => meeting.isRegistered);
    const futureMeetings = meetings.filter(meeting => !meeting.isRegistered);
    const hasFutureMeetings = futureMeetings.length > 0;

    return (
        <Page
            className="LearnerPage"
            title="Разговорный клуб"
        >
            <Page.Header
                title="Разговорный клуб"
            />

            <Page.Content>
                {hasFutureMeetings &&
                    <Alert
                        color="warning"
                        variant="soft"
                        end={
                            <Button
                                content="Подробнее"
                                color="warning"
                                variant="soft"
                                onClick={() => setLevelDialogOpen(true)}
                            />
                        }
                    >
                        <Text>
                            <strong>Внимание!</strong> Выбирайте встречу строго своего уровня!
                        </Text>
                    </Alert>
                }

                {registeredMeetings.length > 0 &&
                    <Page.Section title="Мои встречи">
                        <Grid spacing={2}>
                            {registeredMeetings.map(meeting =>
                                <Grid.Item key={meeting.id} md={4}>
                                    <MeetingCard
                                        meeting={meeting}
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
                        {futureMeetings.map(meeting =>
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

            <LevelDialog
                open={isLevelDialogOpen}
                onClose={() => setLevelDialogOpen(false)}
            />

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