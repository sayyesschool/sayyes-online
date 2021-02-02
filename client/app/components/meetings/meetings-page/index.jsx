import React, { useState, useCallback } from 'react';
import {
    Banner,
    Button,
    Icon,
    LayoutGrid, LayoutGridCell,
    Typography
} from 'mdc-react';

import { useMeetings } from 'shared/hooks/meetings';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import MeetingCard from 'app/components/meetings/meeting-card';
import MeetingRegisterDialog from 'app/components/meetings/meeting-register-dialog';
import MeetingLevelDialog from 'app/components/meetings/meeting-level-dialog';

import './index.scss';

export default function MeetingsPage() {
    const [meetings] = useMeetings();

    const [isLevelDialogOpen, setLevelDialogOpen] = useState(false);
    const [isRegisterDialogOpen, setRegisterDialogOpen] = useState(false);
    const [meeting, setMeeting] = useState();
    const ticket = {};

    const handleMore = useCallback(meeting => {
        setMeeting(meeting);
        setMeetingDialogOpen(true);
    }, [meeting]);

    const handleRegister = useCallback(meeting => {
        setMeeting(meeting);
        setMeetingDialogOpen(false);

        if (meeting.isRegistered || meeting.isPending) {
            actions.unregisterFromMeeting(meeting.id);
        } else if (ticket && ticket.isActive) {
            actions.registerForMeeting(meeting.id);
        } else {
            setRegisterDialogOpen(true);
        }
    }, [ticket]);

    const handleSubmit = useCallback((meeting, isStudent) => {
        if (isStudent) {
            actions.registerForMeeting(meeting.id, isStudent)
                .then(() => setRegisterDialogOpen(false));
        }
    }, [meeting]);

    if (!meetings) return <LoadingIndicator />;

    const registeredMeetings = meetings.filter(meeting => meeting.isRegistered);
    const futureMeetings = meetings.filter(meeting => !meeting.isRegistered);

    return (
        <Page id="meetings-page">
            <Banner
                icon={<Icon>warning</Icon>}
                text={<Typography>Внимание! Выбирайте встречу строго для вашего уровня!</Typography>}
                action={<Button onClick={() => setLevelDialogOpen(true)}>Подробнее</Button>}
            />

            <PageHeader
                title="Разговорный клуб"
                subtitle="На встречах разговорного клуба Вас ждут живое общение на английском языке, интересные темы для обсуждения и новые знакомства. Вы наконец-то сможете сломать языковой барьер!"
            />

            <PageContent>
                <LayoutGrid>
                    <LayoutGridCell span="12">
                        <Typography element="h2" type="headline6" noMargin>Мои встречи</Typography>

                        {registeredMeetings.length === 0 &&
                            <Typography>Вы пока не записаны ни на одну встречу</Typography>
                        }
                    </LayoutGridCell>

                    {registeredMeetings.map(meeting =>
                        <LayoutGridCell key={meeting.id} span="4">
                            <MeetingCard
                                meeting={meeting}
                                onMore={handleMore}
                                onRegister={handleRegister}
                            />
                        </LayoutGridCell>
                    )}
                </LayoutGrid>

                <LayoutGrid>
                    <LayoutGridCell span="12">
                        <Typography element="h2" type="headline6" noMargin>Предстоящие встречи</Typography>

                        {futureMeetings.length === 0 &&
                            <Typography noMargin>Встреч пока не запланировано</Typography>
                        }
                    </LayoutGridCell>

                    {futureMeetings.map(meeting =>
                        <LayoutGridCell key={meeting.id} span="4">
                            <MeetingCard
                                meeting={meeting}
                                onMore={handleMore}
                                onRegister={handleRegister}
                            />
                        </LayoutGridCell>
                    )}
                </LayoutGrid>
            </PageContent>

            <MeetingLevelDialog
                open={isLevelDialogOpen}
                onClose={() => setLevelDialogOpen(false)}
            />

            <MeetingRegisterDialog
                meeting={meeting}
                open={isRegisterDialogOpen}
                onSubmit={handleSubmit}
                onClose={() => setRegisterDialogOpen(false)}
            />
        </Page>
    );
}