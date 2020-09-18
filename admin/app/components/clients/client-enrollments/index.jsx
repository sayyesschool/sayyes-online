import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Card,
    Icon,
    IconButton,
    List,
    Typography
} from 'mdc-react';

export default function ClientEnrollments({ client, onCreate }) {
    return (
        <section className="client-enrollmets">
            <Card>
                <Card.Header
                    title="Обучение"
                    actions={
                        <IconButton title="Создать обучение" onClick={onCreate}>
                            <Icon>add</Icon>
                        </IconButton>
                    }
                />

                {client.enrollments && client.enrollments.length > 0 ?
                    <List twoLine>
                        {client.enrollments.map(enrollment =>
                            <List.Item
                                key={enrollment.id}
                                component={Link}
                                to={`${client.url}${enrollment.url}`}
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