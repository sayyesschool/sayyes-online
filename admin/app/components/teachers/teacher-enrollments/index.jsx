import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Card,
    Icon,
    List
} from 'mdc-react';

export default function TeacherEnrollments({ teacher }) {
    return (
        <section className="teacher-enrollments">
            <Card>
                <Card.Header
                    title="Обучения"
                />

                {teacher.enrollments?.length > 0 &&
                    <List twoLine>
                        {teacher.enrollments.map(enrollment =>
                            <List.Item
                                key={enrollment.id}
                                component={Link}
                                to={`${teacher.url}${enrollment.url}`}
                                graphic={<Icon>{enrollment.statusIcon}</Icon>}
                                primaryText={enrollment.domainLabel}
                                secondaryText={enrollment.statusLabel}
                                meta={enrollment.client &&
                                    <Avatar text={enrollment.client.initials} title={enrollment.client.fullname} />
                                }
                            />
                        )}
                    </List>
                }
            </Card>
        </section>
    );
}