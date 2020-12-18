import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Icon,
    List
} from 'mdc-react';

export default function EnrollmentAssignments({ enrollment }) {
    return (
        <div className="enrollment-assignments">
            <Card outlined>
                <Card.Header
                    title="Домашние задания"
                    subtitle={(!enrollment.assignments || enrollment.assignments.length === 0) && 'Заданий пока нет'}
                />

                {enrollment.assignments &&
                    <Card.Section>
                        <List twoLine>
                            {enrollment.assignments?.map(assignment =>
                                <List.Item
                                    key={assignment.id}
                                    component={Link}
                                    to={`${enrollment.url}${assignment.url}`}
                                    primaryText={assignment.title}
                                    secondaryText={`${assignment.statusLabel} • ${assignment.timeToDue}`}
                                    meta={<Icon>{assignment.statusIcon}</Icon>}
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>
        </div>
    );
}