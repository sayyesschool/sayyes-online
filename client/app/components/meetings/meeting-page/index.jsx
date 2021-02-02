import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Banner,
    Button,
    ChipSet, Chip,
    FAB,
    Icon,
    Layout,
    LayoutGrid,
    Typography
} from 'mdc-react';

import { useMeeting } from 'shared/hooks/meetings';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import MeetingRegisterDialog from 'app/components/meetings/meeting-register-dialog';
import MeetingLevelDialog from 'app/components/meetings/meeting-level-dialog';

import './index.scss';

export default function MeetingPage({ match }) {
    const [meeting] = useMeeting(match.params.id);

    const [isLevelDialogOpen, setLevelDialogOpen] = useState(false);
    const [isRegisterDialogOpen, setRegisterDialogOpen] = useState(false);

    const ticket = {};

    const handleRegister = useCallback(() => {
        if (meeting.isRegistered || meeting.isPending) {
            actions.unregisterFromMeeting(meeting.id);
        } else if (ticket && ticket.isActive) {
            actions.registerForMeeting(meeting.id);
        } else {
            setRegisterDialogOpen(true);
        }
    }, [meeting]);

    const handleSubmit = useCallback((meeting, isStudent) => {
        if (isStudent) {
            actions.registerForMeeting(meeting.id, isStudent)
                .then(() => setRegisterDialogOpen(false));
        }
    }, [meeting]);

    if (!meeting) return <LoadingIndicator />;

    return (
        <Page id="meeting-page">
            <PageHeader
                breadcrumbs={[
                    <Link to="/meetings">Разговорный клуб</Link>
                ]}
                title={meeting.title}
                actions={
                    <FAB
                        className="meeting-register-button"
                        label={meeting.isRegistered ? 'Отменить запись' : 'Зарегистрироваться'}
                        onClick={handleRegister}
                    />
                }
                pullContent
            >
                <div className="meeting-meta">
                    <div className="meeting-meta__item">
                        <Chip
                            className="meeting-datetime"
                            leadingIcon={<Icon>event</Icon>}
                            text={`${meeting.datetime}`}
                            outlined
                        />
                    </div>

                    <div className="meeting-meta__item">
                        <Chip
                            className={`meeting-level meeting-level--${meeting.level.toLowerCase()}`}
                            leadingIcon={<Icon>star</Icon>}
                            text={meeting.level}
                            outlined
                        />
                    </div>

                    {meeting.host &&
                        <div className="meeting-meta__item">
                            <Chip
                                className="meeting-host"
                                leadingIcon={meeting.host.avatarUrl ? <Avatar src={meeting.host.avatarUrl} /> : <Icon>person</Icon>}
                                text={meeting.host.fullname}
                                outlined
                            />
                        </div>
                    }
                </div>
            </PageHeader>

            <PageContent>
                <Card>
                    <LayoutGrid>
                        <LayoutGrid.Cell span="4">
                            <Card.Media
                                className="meeting-image"
                                imageUrl={STATIC_URL + meeting.imageUrl}
                                wide
                            />
                        </LayoutGrid.Cell>

                        <LayoutGrid.Cell span="8">
                            <Card.Section primary>
                                <Typography className="meeting-description">{meeting.description}</Typography>
                            </Card.Section>
                        </LayoutGrid.Cell>
                    </LayoutGrid>
                </Card>

                <Typography align="center">
                    <strong>Внимание!</strong> Выбирайте встречу строго для вашего уровня!
                            <Button onClick={() => setLevelDialogOpen(true)}>Подробнее</Button>
                </Typography>
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