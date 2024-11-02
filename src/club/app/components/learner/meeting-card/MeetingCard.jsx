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

import styles from './MeetingCard.module.scss';

export default function MeetingCard({ meeting, onRegister }) {
    return (
        <Card className={styles.root} outlined>
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
                <Flex dir="column" gap="small">
                    <Flex dir="column">
                        <Heading
                            content={meeting.title}
                            type="title-md"
                        />

                        <Text
                            content={`${meeting.online ? 'Онлайн' : 'Офлайн'} · ${meeting.datetime}`}
                            type="body-sm"
                        />
                    </Flex>

                    <Flex gap="small">
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
                </Flex>
            </Card.Content>

            <Card.Overflow>
                <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
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