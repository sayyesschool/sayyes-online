import { Link } from 'react-router-dom';

import { Avatar, Box, Button, Flex, Header, Image, Surface, Text } from 'shared/ui-components';
import WeekSchedule from 'shared/components/week-schedule';
import { pluralize } from 'shared/utils/format';

import './index.scss';

export default function EnrollmentDetailsCard({ enrollment, onPay, ...props }) {
    const nextLesson = enrollment.lessons?.find(lesson => lesson.status === 'scheduled');

    return (
        <Surface className="enrollment-details-card" {...props}>
            <Flex>
                <Flex.Item size="size.quarter">
                    <Box className="enrollment-details-card__section enrollment-details-card__main-section">
                        <Header
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

                        <Button as={Link} to={enrollment.url} fluid flat tinted>Подробнее</Button>
                    </Box>
                </Flex.Item>

                <Flex.Item size="size.quarter">
                    <Flex className="enrollment-details-card__section enrollment-details-card__teacher-section" column>
                        <Header
                            as="h3"
                            content="Преподаватель"
                        />

                        <Flex className="teacher-info" gap="gap.small" hAlign="center" column>
                            <Avatar
                                className="teacher-avatar"
                                image={enrollment.teacher.imageUrl}
                                size="largest"
                            />

                            <Text size="large" weight="bold" >{enrollment.teacher.fullname}</Text>
                        </Flex>
                    </Flex>
                </Flex.Item>

                <Flex.Item size="size.quarter">
                    <Flex className="enrollment-details-card__section enrollment-details-card__schedule-section" column>
                        <Header
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

                        <Button as="a" href={enrollment.classUrl} flat tinted>Перейти в класс</Button>
                    </Flex>
                </Flex.Item>

                <Flex.Item size="size.quarter">
                    <Box className="enrollment-details-card__section enrollment-details-card__payment-section">
                        <Header
                            as="h3"
                            content="Баланс"
                        />

                        <Box className="balance-item">
                            <Text as="strong">0</Text>
                            <Text>{pluralize('урок', enrollment.numberOfScheduledLessons)}<br />по 50 минут</Text>
                        </Box>

                        <Button
                            content="Пополнить"
                            primary
                            variables={{
                                primaryColor: '#ffffff',
                                primaryBackgroundColor: '#e71985',
                                primaryBackgroundColorHover: '#cf1677'
                            }}
                            onClick={onPay}
                        />
                    </Box>
                </Flex.Item>
            </Flex>
        </Surface>
    );
}