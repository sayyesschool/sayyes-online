import React from 'react';

import { StatusColor, StatusIcon, StatusLabel } from 'shared/data/registration';
import {
    Avatar,
    Button,
    Chip,
    Flex,
    Heading,
    List,
    ListItem,
    Text
} from 'shared/ui-components';

import styles from './MeetingDetails.module.scss';

export default function MeetingDetails({
    meeting,
    onStart,
    ...props
}) {
    return (
        <div
            className={styles.root}
            {...props}
        >
            <Flex dir="column" gap="small">
                <Flex dir="column">
                    <Heading content={meeting.title} type="title-lg" />

                    <Text
                        content={`${meeting.online ? 'Онлайн' : 'Офлайн'} · ${meeting.datetime}`}
                        type="body-sm"
                    />
                </Flex>

                <Flex gap="small">
                    <Chip
                        icon="timelapse"
                        content={`${meeting.duration} мин.`}
                        title="Продолжительность"
                        size="sm"
                    />

                    <Chip
                        icon="star"
                        content={meeting.levelLabel}
                        title="Уровень"
                        size="sm"
                    />
                </Flex>

                <div
                    className={styles.description}
                    dangerouslySetInnerHTML={{ __html: meeting.description }}
                />

                <div>
                    <Heading content="Участники" type="title-sm" />

                    {meeting.registrations.length > 0 ?
                        <List>
                            {meeting.registrations.map(registration =>
                                <ListItem
                                    key={registration.id}
                                    decorator={
                                        <Avatar
                                            content={registration.user.initials}
                                            size="sm"
                                        />
                                    }
                                    content={{
                                        primary: registration.user.fullname,
                                        secondary: registration.user.email
                                    }}
                                    end={
                                        <Chip
                                            icon={StatusIcon[registration.status]}
                                            content={StatusLabel[registration.status]}
                                            color={StatusColor[registration.status]}
                                        />
                                    }
                                />
                            )}
                        </List>
                        :
                        <Text content="Ни один человек еще не зарегистрировался" type="body-sm" />
                    }
                </div>

                <Button
                    as="a"
                    href={meeting.joinUrl}
                    content="Начать"
                />
            </Flex>
        </div>
    );
}