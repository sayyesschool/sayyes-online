import React from 'react';
import { Link } from 'react-router-dom';

import {
    Avatar,
    Button,
    Card,
    Chip,
    Flex,
    Icon
} from 'shared/components/ui';

export default function MeetingCard({ meeting }) {
    return (
        <Card className="MeetingCard" outlined>
            {meeting.isPending &&
                <Card.Header
                    title="Заявка обрабатывается"
                    graphic={<Icon>hourglass_empty</Icon>}
                />
            }

            <Card.Media
                imageUrl={meeting.thumbnailUrl}
                wide
            />

            <Card.Header
                title={meeting.title}
                subtitle={meeting.datetime}
            />

            <Card.Section>
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
            </Card.Section>

            <Card.Actions>
                <Button component={Link} to={meeting.url}>Подробнее</Button>
            </Card.Actions>
        </Card>
    );
}