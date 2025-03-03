import { Link } from 'react-router-dom';

import WeekSchedule from 'shared/components/week-schedule';
import { CLASS_URL } from 'shared/constants';
import { DomainLabel, RoleLabel } from 'shared/data/common';
import { Avatar, Button, Card, Divider, Flex, Heading, Image, Surface, Text } from 'shared/ui-components';
import { getLessonDateTimeString, pluralize } from 'shared/utils/format';

const otherUserRole = {
    learner: 'teacher',
    teacher: 'learner'
};

export default function EnrollmentDetailsCard({
    user,
    enrollment,

    ...props
}) {
    const nextLesson = enrollment.lessons?.find(({ status }) => status === 'scheduled');
    const otherUser = enrollment[otherUserRole[user?.role]];

    return (
        <Card
            className="EnrollmentDetailsCard"
            variant="plain"
            orientation="horizontal"
            sx={{ gap: 0, padding: 0 }}
            {...props}
        >
            <Surface
                className="EnrollmentDetailsCard__main-section EnrollmentDetailsCard__item"
                color="primary"
                variant="soft"
            >
                <Heading
                    as="h3"
                    content="Направление обучения"
                />

                <Image src={enrollment.imageUrl} alt="" />

                <Text
                    as="p"
                    content={DomainLabel[enrollment.domain]}
                    type="title-lg"
                />

                <Button
                    as={Link}
                    to={enrollment.url}
                    content="Подробнее"
                    variant="plain"
                />
            </Surface>

            <Surface
                className="EnrollmentDetailsCard__person-section EnrollmentDetailsCard__item"
                color="neutral"
                variant="plain"
            >
                <Heading
                    as="h3"
                    content={RoleLabel[otherUser?.role]}
                />

                <Flex
                    flex="1"
                    dir="column"
                    alignItems="center"
                    justifyContent="center"
                    gap="small"
                >
                    <Avatar
                        src={otherUser?.imageUrl}
                        sx={{ width: 128, height: 128 }}
                    />

                    <Text type="title-lg">{otherUser?.fullname}</Text>
                </Flex>
            </Surface>

            <Divider orientation="vertical" className="EnrollmentDetailsCard__divider" />

            <Surface className="EnrollmentDetailsCard__schedule-section EnrollmentDetailsCard__item">
                <Heading
                    as="h3"
                    content="Расписание"
                />

                {enrollment.schedule ?
                    <WeekSchedule schedule={enrollment.schedule} />
                    :
                    <Text content="Не назначено" />
                }

                {nextLesson &&
                    <Card size="small">
                        <Card.Content>
                            <Text
                                type="title-md"
                                content={getLessonDateTimeString(nextLesson)}
                            />

                            {nextLesson.room &&
                                <Text type="body-md">{nextLesson.room.name}</Text>
                            }
                        </Card.Content>

                        <Card.Actions>
                            <Button
                                as="a"
                                href={`${CLASS_URL}/${enrollment.id}`}
                                content="Перейти в класс"
                                variant="soft"
                            />
                        </Card.Actions>
                    </Card>
                }
            </Surface>

            <Surface
                className="EnrollmentDetailsCard__payment-section EnrollmentDetailsCard__item"
                color="primary"
                variant="solid"
            >
                <Heading
                    as="h3"
                    content="Баланс"
                />

                <Flex alignItems="center" gap="small">
                    <Text as="strong">0</Text>

                    <Text>
                        {pluralize('урок', enrollment.numberOfScheduledLessons)}<br />
                        по 50 минут
                    </Text>
                </Flex>

                {user.isLearner &&
                    <Button
                        content="Пополнить"
                        //color="secondary"
                        variant="solid"
                    //onClick={onPay}
                    />
                }
            </Surface>
        </Card>
    );
}