import React from 'react';
import {
    Card
} from 'mdc-react';

export default function EnrollmentCard({ enrollment, ...props }) {
    return (
        <Card outlined {...props}>
            <Card.Header
                title={enrollment.title}
                subtitle={enrollment.statusLabel}
            />
        </Card>
    );
}