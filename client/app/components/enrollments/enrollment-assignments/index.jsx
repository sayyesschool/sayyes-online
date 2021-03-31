import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Chip,
    Icon,
    List
} from 'mdc-react';

export default function EnrollmentAssignments({ enrollment }) {
    return (
        <section className="enrollment-assignments">
            <Card>
                <Card.Header
                    graphic={<Icon>assignment</Icon>}
                    title="Домашние задания"
                    subtitle={(!enrollment.assignments || enrollment.assignments.length === 0) && 'Заданий пока нет'}
                />

                {enrollment.assignments?.length > 0 &&
                    <Card.Section>
                        <List twoLine>
                            {enrollment.assignments?.map(assignment =>
                                <List.Item
                                    key={assignment.id}
                                    component={Link}
                                    to={`${enrollment.url}${assignment.url}`}
                                    graphic={<Icon>{assignment.statusIcon}</Icon>}
                                    primaryText={assignment.title}
                                    secondaryText={`${assignment.statusLabel}`}
                                    meta={<Chip
                                        icon={<Icon>forum</Icon>}
                                        text={assignment.comments.length}
                                        disabled
                                        outlined
                                    />}
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>
        </section>
    );
}