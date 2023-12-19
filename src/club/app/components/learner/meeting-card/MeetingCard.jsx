import React from 'react';
import { Link } from 'react-router-dom';

import {
    Alert,
    Avatar,
    Button,
    Card,
    Chip,
    Flex,
    Heading,
    Icon,
    Image,
    Text
} from 'shared/components/ui';

export default function MeetingCard({ meeting, onRegister }) {
    return (
        <Card className="MeetingCard" outlined>
            {meeting.isPending &&
                <Alert
                    start={<Icon>hourglass_empty</Icon>}
                    content="Заявка обрабатывается"
                />
            }

            <Card.Overflow>
                <Image
                    src={meeting.thumbnailUrl}
                    ratio="16/9"
                    loading="lazy"
                    alt=""
                    sx={{ width: '100%' }}
                />
            </Card.Overflow>

            <Card.Content>
                <Text
                    content={meeting.online ? 'Онлайн' : 'Офлайн'}
                    type="body-xs"
                />

                <Heading
                    content={meeting.title}
                    type="title-md"
                />

                <Text
                    content={meeting.datetime}
                    type="body-sm"
                />

                <Flex gap="small">
                    {/* <Chip
                        leadingIcon={<Icon>{meeting.online ? 'laptop' : 'business'}</Icon>}
                        text={meeting.online ? 'Онлайн' : 'Офлайн'}
                        title="Формат"
                        outlined
                    /> */}

                    {meeting.host &&
                        <Chip
                            start={meeting.host.avatarUrl ?
                                <Avatar src={meeting.host.avatarUrl} /> :
                                <Icon>person</Icon>
                            }
                            content={meeting.host.fullname}
                            title="Ведущий"
                            size="sm"
                        />
                    }

                    <Chip
                        start={<Icon>timelapse</Icon>}
                        content={`${meeting.duration} мин.`}
                        title="Продолжительность"
                        size="sm"
                    />

                    <Chip
                        start={<Icon>star</Icon>}
                        content={meeting.level}
                        title="Уровень"
                        size="sm"
                    />
                </Flex>
            </Card.Content>

            <Card.Overflow>
                <Flex justifyContent="space-between">
                    <Button
                        as={Link}
                        to={meeting.url}
                        content="Подробнее"
                        variant="plain"
                    />

                    <Button
                        content="Зарегистрироваться"
                        onClick={() => onRegister(meeting)}
                    />
                </Flex>
            </Card.Overflow>
        </Card>
    );
}