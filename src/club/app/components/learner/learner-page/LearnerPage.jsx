import { useState, useCallback } from 'react';

import { useStore } from 'shared/hooks/store';
import Page from 'shared/components/page';
import {
    Alert,
    Grid
} from 'shared/components/ui';

import { actionCreators } from 'app/store/modules/meetings';
import MeetingCard from 'app/components/learner/meeting-card';
import LevelDialog from 'app/components/learner/level-dialog';

export default function LearnerPage() {
    const [{ account, meetings }, actions] = useStore(
        state => ({
            account: state.account,
            meetings: state.meetings.filter(meeting => meeting.status !== 'ended')
        }),
        actionCreators
    );

    const [isLevelDialogOpen, setLevelDialogOpen] = useState(false);

    const handleRegister = useCallback(meeting => {
        setMeeting(meeting);

        if (meeting.isRegistered || meeting.isPending) {
            actions.unregisterFromMeeting(meeting.id);
        } else if (meeting.free || account.balance >= meeting.price) {
            actions.registerForMeeting(meeting.id);
        } else {
            setRegisterDialogOpen(true);
        }
    }, []);

    const registeredMeetings = meetings.filter(meeting => meeting.isRegistered);
    const futureMeetings = meetings.filter(meeting => !meeting.isRegistered);

    return (
        <Page className="LearnerPage">
            {registeredMeetings.length > 0 &&
                <Page.Section title="Мои встречи">
                    <Grid>
                        {registeredMeetings.map(meeting =>
                            <Grid.Item key={meeting.id} span="4">
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
                description={futureMeetings.length === 0 && 'Встреч пока не запланировано'}
            >
                <Alert>
                    <strong>Внимание!</strong> Выбирайте встречу строго <a href="#" onClick={() => setLevelDialogOpen(true)}>своего уровня!</a>
                </Alert>

                <Grid>
                    {futureMeetings.map(meeting =>
                        <Grid.Item key={meeting.id} span="4">
                            <MeetingCard
                                meeting={meeting}
                                onRegister={handleRegister}
                            />
                        </Grid.Item>
                    )}
                </Grid>
            </Page.Section>

            <LevelDialog
                open={isLevelDialogOpen}
                onClose={() => setLevelDialogOpen(false)}
            />
        </Page>
    );
}