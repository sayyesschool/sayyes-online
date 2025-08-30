import { useCallback, useState } from 'react';

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
import datetime from 'shared/libs/datetime';
import cn from 'shared/utils/classnames';

import styles from './MeetingCard.module.scss';

export default function MeetingCard({
    meeting,
    showDescription,
    orientation,
    onView,
    onRegister,
    ...props
}) {
    const now = datetime().utc();
    const startsIn = datetime(meeting.date).diff(now, 'minutes');

    const [isLoading, setLoading] = useState(false);

    const handleRegister = useCallback(() => {
        setLoading(true);

        return onRegister?.(meeting).finally(() => setLoading(false));
    }, [meeting, onRegister]);

    return (
        <Card
            className={cn(styles.root, styles[meeting.status])}
            variant="plain"
            orientation={orientation}
            sx={{ boxShadow: 'lg' }}
            {...props}
        >
            {/* <Card.Overflow sx={orientation === 'horizontal' ? { width: '25%' } : undefined}>
                <Image
                    className={styles.image}
                    src={meeting.imageUrl}
                    ratio="16/9"
                    loading="lazy"
                    alt=""
                    sx={orientation === 'horizontal' ? { width: '100%' } : undefined}
                />
            </Card.Overflow> */}

            <Card.Content>
                {meeting.isPending &&
                    <Alert
                        start={<Icon>hourglass_empty</Icon>}
                        content="Заявка обрабатывается"
                    />
                }

                <Flex dir="column" gap="small">
                    <Flex dir="column">
                        <Heading
                            content={meeting.title}
                            type="title-lg"
                        />

                        <Text
                            content={meeting.datetime}
                            type="body-sm"
                        />
                    </Flex>

                    <Flex gap="small">
                        <Chip
                            content={meeting.online ? 'Онлайн' : 'Офлайн'}
                            color={meeting.online ? 'primary' : 'neutral'}
                            variant="soft"
                            inline
                        />

                        {meeting.host &&
                            <Chip
                                start={meeting.host.avatarUrl ?
                                    <Avatar src={meeting.host.avatarUrl} /> :
                                    <Icon>person</Icon>
                                }
                                content={meeting.host.fullname}
                                title="Ведущий"
                            />
                        }

                        <Chip
                            icon="timelapse"
                            content={`${meeting.duration} мин.`}
                            title="Продолжительность"
                        />

                        <Chip
                            icon="star"
                            content={meeting.levelLabel}
                            title="Уровень"
                        />
                    </Flex>
                </Flex>

                {showDescription &&
                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: meeting.description }}
                    />
                }

                <Card.Actions sx={{ justifyContent: 'space-between' }} buttonFlex>
                    {onView &&
                        <Button
                            content="Подробнее"
                            variant="plain"
                            onClick={() => onView(meeting)}
                        />
                    }

                    {meeting.isScheduled &&
                        <Button
                            content={meeting.isRegistered ? 'Отменить' : 'Записаться'}
                            variant={meeting.isRegistered ? 'outlined' : 'solid'}
                            disabled={isLoading}
                            loading={isLoading}
                            onClick={handleRegister}
                        />
                    }

                    {meeting.isRegistered && meeting.joinUrl && startsIn < 60 &&
                        <Button
                            as="a"
                            href={meeting.joinUrl}
                            content="Присоединиться"
                        />
                    }
                </Card.Actions>
            </Card.Content>
        </Card>
    );
}