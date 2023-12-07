import React, { useState, useCallback } from 'react';

import { useStore } from 'shared/hooks/store';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import {
    Avatar,
    Button,
    Card,
    Chip,
    Flex,
    Heading,
    Icon,
    Grid,
    Text
} from 'shared/components/ui';

import { actionCreators } from 'app/store/modules/meetings';
import RegistrationForm from 'app/components/meetings/meeting-registration-form';

export default function MeetingPage({ match }) {
    const [{ account, meeting }, actions] = useStore(state => ({
        account: state.account,
        meeting: state.meetings.find(meeting => meeting.id === match.params.meetingId)
    }), actionCreators);

    const [isLoading, setLoading] = useState(false);
    const [isRegisterDialogOpen, setRegisterDialogOpen] = useState(false);

    const handleRegister = useCallback(() => {
        if (meeting.free || account.balance >= meeting.price) {
            setLoading(true);
            actions.registerForMeeting(meeting.id).finally(() => setLoading(false));
        } else {
            setRegisterDialogOpen(true);
        }
    }, [meeting]);

    const handleCancel = useCallback(() => {
        if (meeting.isRegistered || meeting.isPending) {
            setLoading(true);
            actions.unregisterFromMeeting(meeting.id).finally(() => setLoading(false));
        }
    }, [meeting]);

    const handleSubmit = useCallback(() => {
        setRegisterDialogOpen(false).finally(() => setLoading(false));
    }, [meeting]);

    const handleDialogClose = useCallback(() => {
        setRegisterDialogOpen(false);
        setLoading(false);
    }, []);

    if (!meeting) return <LoadingIndicator />;

    const meetingStartsIn = (new Date(meeting.date) - Date.now()) / 1000 / 60 / 60;
    const canUnregister = meetingStartsIn > 2;

    return (
        <Page className="MeetingPage">
            <Page.Content>
                <Grid>
                    <Grid.Item span="8">
                        <Heading element="h1" type="headline3" noMargin>{meeting.title}</Heading>

                        <Text type="subtitle1" noMargin>{meeting.datetime}</Text>

                        <Flex gap="small">
                            {/* <Chip
                            leadingIcon={<Icon>{meeting.online ? 'laptop' : 'business'}</Icon>}
                            text={meeting.online ? 'Онлайн' : 'Офлайн'}
                            title="Формат"
                            outlined
                        /> */}

                            <Chip
                                className="meeting-host"
                                leadingIcon={meeting.host.avatarUrl ? <Avatar src={meeting.host.avatarUrl} /> : <Icon>person</Icon>}
                                text={meeting.host.fullname}
                                title="Ведущий"
                                outlined
                            />

                            <Chip
                                className="meeting-duration"
                                leadingIcon={<Icon>timelapse</Icon>}
                                text={`${meeting.duration} мин.`}
                                title="Продолжительность"
                                outlined
                            />

                            <Chip
                                className={`meeting-level meeting-level--${meeting.level.toLowerCase()}`}
                                leadingIcon={<Icon>star</Icon>}
                                text={meeting.level}
                                title="Уровень"
                                outlined
                            />
                        </Flex>

                        <div dangerouslySetInnerHTML={{ __html: meeting.description }} />

                        {meeting.materialsUrl && meeting.isRegistered &&
                            <Button
                                element="a"
                                href={meeting.materialsUrl}
                                target="_blank"
                                content="Открыть материалы"
                            />
                        }
                    </Grid.Item>

                    <Grid.Item span="4">
                        <Card outlined>
                            <Card.Media
                                imageUrl={meeting.thumbnailUrl}
                                wide
                            />
                        </Card>

                        <Card outlined>
                            {meeting.isRegistered ?
                                <Card.Section primary>
                                    <Text type="subtitle1" display="block">Вы зарегистрированы на встречу.</Text>

                                    {!meeting.isEnded &&
                                    <Button
                                        element="a"
                                        className="join-button"
                                        href={meeting.joinUrl}
                                        target="_blank"
                                        label="Подключиться"
                                        unelevated
                                    />
                                    }

                                    {canUnregister &&
                                    <>
                                        <Text type="body2">Отменить участие можно за 2 часа до начала.</Text>

                                        <Button
                                            label="Отменить регистрацию"
                                            disabled={isLoading}
                                            outlined
                                            onClick={handleCancel}
                                        />
                                    </>
                                    }
                                </Card.Section>
                                :
                                <Card.Section primary>
                                    <Text type="overline" display="block" align="center">Стоимость участия</Text>
                                    <Text type="headline5" align="center">{meeting.price} руб.</Text>

                                    <Button
                                        label="Зарегистрироваться"
                                        disabled={isLoading}
                                        unelevated
                                        onClick={handleRegister}
                                    />
                                </Card.Section>
                            }
                        </Card>
                    </Grid.Item>
                </Grid>
            </Page.Content>

            <FormDialog
                open={isRegisterDialogOpen}
                submitButtonText="Оплатить"
                onClose={handleDialogClose}
            >
                <RegistrationForm
                    account={account}
                    meeting={meeting}
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </Page>
    );
}