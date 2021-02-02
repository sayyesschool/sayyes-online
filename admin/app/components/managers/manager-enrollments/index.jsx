import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Card,
    Icon,
    List,
    Typography
} from 'mdc-react';

export default function ManagerEnrollments({ manager, onCreate }) {
    return (
        <section className="manager-enrollments">
            <Card>
                <Card.Header
                    title="Обучение"
                />

                {manager.enrollments && manager.enrollments.length > 0 ?
                    <List twoLine>
                        {manager.enrollments.map(enrollment =>
                            <List.Item
                                key={enrollment.id}
                                component={Link}
                                to={`${manager.url}${enrollment.url}`}
                                graphic={<Icon>{enrollment.statusIcon}</Icon>}
                                primaryText={enrollment.title}
                                secondaryText={enrollment.statusLabel}
                                meta={enrollment.teacher && <Avatar text={enrollment.teacher.initials} title={enrollment.teacher.fullname} />}
                            />
                        )}
                    </List>
                    :
                    <Card.Section primary>
                        <Typography noMargin>Обучений пока нет</Typography>
                    </Card.Section>
                }
            </Card>
        </section>
    );
}