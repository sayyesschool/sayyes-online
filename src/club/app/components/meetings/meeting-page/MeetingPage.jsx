import React, { useState, useCallback } from 'react';

import { useMeeting } from 'shared/hooks/meetings';
import { useUser } from 'shared/hooks/user';
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
    Image,
    Grid,
    Text,
    Surface
} from 'shared/components/ui';

import RegistrationForm from 'app/components/meetings/meeting-registration-form';

export default function MeetingPage({ match }) {
    const [user] = useUser();
    const [meeting, actions] = useMeeting(match.params.meetingId);

    const [isLoading, setLoading] = useState(false);
    const [isRegisterDialogOpen, setRegisterDialogOpen] = useState(false);

    const handleRegister = useCallback(() => {
        if (meeting.free || user.balance >= meeting.price) {
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
            <Page.Header
                breadcrumbs={[
                    { to: '/', content: 'Назад' }
                ]}
                title={meeting.title}
            >
                <Flex gap="small">
                    <Text
                        content={meeting.datetime}
                    />

                    <Chip
                        content={meeting.online ? 'Онлайн' : 'Офлайн'}
                        color="primary"
                    />

                    {/* <Chip
                            leadingIcon={<Icon>{meeting.online ? 'laptop' : 'business'}</Icon>}
                            text={meeting.online ? 'Онлайн' : 'Офлайн'}
                            title="Формат"
                            outlined
                        /> */}

                    {meeting.host &&
                        <Chip
                            start={meeting.host.avatarUrl ? <Avatar src={meeting.host.avatarUrl} /> : <Icon>person</Icon>}
                            content={meeting.host.fullname}
                            title="Ведущий"
                        />
                    }

                    <Chip
                        start={<Icon>timelapse</Icon>}
                        content={`${meeting.duration} мин.`}
                        title="Продолжительность"
                    />

                    <Chip
                        start={<Icon>star</Icon>}
                        content={meeting.level}
                        title="Уровень"
                    />
                </Flex>
            </Page.Header>

            <Page.Content>
                <Grid spacing={2}>
                    <Grid.Item md={8}>
                        <Text as="div">
                            <div dangerouslySetInnerHTML={{ __html: meeting.description }} />
                        </Text>

                        {meeting.materialsUrl && meeting.isRegistered &&
                            <Button
                                element="a"
                                href={meeting.materialsUrl}
                                target="_blank"
                                content="Открыть материалы"
                            />
                        }
                    </Grid.Item>

                    <Grid.Item md={4}>
                        <Card>
                            <Image
                                src={meeting.thumbnailUrl}
                                ratio="21/9"
                                alt=""
                                sx={{ width: '100%' }}
                            />
                        </Card>

                        <Card>
                            {meeting.isRegistered ?
                                <Card.Content>
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
                                </Card.Content>
                                :
                                <Card.Content>
                                    <Text type="overline" display="block" align="center">Стоимость участия</Text>
                                    <Text type="headline5" align="center">{meeting.price} руб.</Text>

                                    <Button
                                        content="Зарегистрироваться"
                                        disabled={isLoading}
                                        onClick={handleRegister}
                                    />
                                </Card.Content>
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
                    user={user}
                    meeting={meeting}
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </Page>
    );
}