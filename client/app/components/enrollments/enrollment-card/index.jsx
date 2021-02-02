import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Button,
    Card
} from 'mdc-react';

import './index.scss';

export default function EnrollmentCard({ enrollment, ...props }) {
    return (
        <Card className="enrollment-card" outlined {...props}>
            <Card.Header
                title={enrollment.domainLabel}
                subtitle={`${enrollment.typeLabel} ‧ ${enrollment.scheduleLabel}`}
                actions={<Avatar src={enrollment.teacher.imageUrl} />}
            />

            <Card.Section>

            </Card.Section>

            <Card.Actions>
                <Card.Action button>
                    <Button component={Link} to={enrollment.url}>Подробнее</Button>
                </Card.Action>
            </Card.Actions>
        </Card>
    );
}