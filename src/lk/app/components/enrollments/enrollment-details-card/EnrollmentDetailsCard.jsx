import { Link } from 'react-router-dom';

import { Avatar, Box, Button, Flex, Grid, Heading, Image, Surface, Text } from 'shared/ui-components';
import WeekSchedule from 'shared/components/week-schedule';
import { pluralize } from 'shared/utils/format';

export default function EnrollmentDetailsCard({
    enrollment,
    onPay,

    ...props
}) {
    const nextLesson = enrollment.lessons?.find(lesson => lesson.status === 'scheduled');

    return (
        <article className="enrollment-details-card" {...props}>
            <Surface className="enrollment-details-card__main-section" color="primary" variant="soft">
                <Heading
                    as="h3"
                    content="Направление обучения"
                />

                <Image src={enrollment.imageUrl} alt="" />

                <Text
                    as="p"
                    content={enrollment.domainLabel}
                    size="large"
                    weight="bold"
                />

                <Button as={Link} to={enrollment.url} variant="plain">Подробнее</Button>
            </Surface>

            <Surface className="enrollment-details-card__teacher-section" color="neutral" variant="plain">
                <Heading
                    as="h3"
                    content="Преподаватель"
                />

                <Flex className="teacher-info" gap="small" direction="column">
                    <Avatar
                        className="teacher-avatar"
                        src={enrollment.teacher.imageUrl}
                        sx={{ width: 128, height: 128 }}
                    />

                    <Text size="large" weight="bold">{enrollment.teacher.fullname}</Text>
                </Flex>
            </Surface>

            <Surface className="enrollment-details-card__schedule-section">
                <Heading
                    as="h3"
                    content="Расписание"
                />

                {enrollment.schedule ?
                    <WeekSchedule schedule={enrollment.schedule} />
                    :
                    <Text
                        content="Не назначено"
                    />
                }

                <Button as="a" href={enrollment.classUrl} variant="soft">Перейти в класс</Button>
            </Surface>

            <Box className="enrollment-details-card__payment-section" sx={{ bgcolor: 'primary.main' }}>
                <Heading
                    as="h3"
                    content="Баланс"
                    color="primary.contrastText"
                />

                <Box className="balance-item">
                    <Text as="strong" type="h1" color="primary.contrastText">0</Text>
                    <Text color="primary.contrastText">{pluralize('урок', enrollment.numberOfScheduledLessons)}<br />по 50 минут</Text>
                </Box>

                <Button
                    content="Пополнить"
                    //color="secondary"
                    variant="solid"
                    onClick={onPay}
                />
            </Box>
        </article>
    );
}