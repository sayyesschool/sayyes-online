import {
    Avatar,
    Button,
    Card,
    Icon,
    LayoutGrid,
    Typography
} from 'mdc-react';

import { pluralize } from 'shared/utils/format';
import WeekSchedule from 'shared/components/week-schedule';

import './index.scss';

export default function EnrollmentDetailsCard({ enrollment, onPay, ...props }) {
    const nextLesson = enrollment.lessons?.find(lesson => lesson.status === 'scheduled');

    return (
        <Card className="enrollment-details-card" {...props}>
            <LayoutGrid>
                <LayoutGrid.Cell span="3" className="enrollment-details-card__section enrollment-details-card__main-section">
                    <Card.Header
                        graphic={<Icon>school</Icon>}
                        title="Направление обучения"
                    />

                    <Card.Section primary>
                        <img src={STATIC_URL + enrollment.imageSrc} />

                        <Typography className="domain-name" type="headline6">{enrollment.domainLabel}</Typography>
                    </Card.Section>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="3" className="enrollment-details-card__section enrollment-details-card__teacher-section">
                    <Card.Header
                        graphic={<Icon>badge</Icon>}
                        title="Преподаватель"
                    />

                    <Card.Section primary>
                        <Avatar className="teacher-image" src={enrollment.teacher.imageUrl} />

                        <Typography className="teacher-name" type="headline6">{enrollment.teacher.fullname}</Typography>
                    </Card.Section>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="3" className="enrollment-details-card__section enrollment-details-card__schedule-section">
                    <Card.Header
                        graphic={<Icon>today</Icon>}
                        title="Расписание"
                    />

                    <Card.Section primary>
                        <Card className="week-schedule-card" outlined>
                            {enrollment.schedule ?
                                <WeekSchedule schedule={enrollment.schedule} />
                                :
                                <Card.Header
                                    title="Не назначено"
                                />
                            }
                        </Card>
                    </Card.Section>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="3" className="enrollment-details-card__section enrollment-details-card__payment-section">
                    <Card.Header
                        graphic={<Icon>payment</Icon>}
                        title="Баланс"
                    />

                    <Card.Section primary>
                        <div className="balance-item">
                            <Typography element="strong" noMargin>0</Typography>
                            <Typography noMargin>{pluralize('урок', enrollment.numberOfScheduledLessons)}<br />по 50 минут</Typography>
                        </div>
                    </Card.Section>

                    <Card.Actions>
                        <Button onClick={onPay} unelevated>Пополнить</Button>
                    </Card.Actions>
                </LayoutGrid.Cell>
            </LayoutGrid>
        </Card>
    );
}