import React from 'react';
import {
    Avatar,
    Card
} from 'mdc-react';

export default function EnrollmentCard({ enrollment, ...props }) {
    return (
        <Card outlined {...props}>
            <Card.PrimaryAction>
                <Card.Header
                    graphic={<Avatar text={enrollment.client.initials} />}
                    title={enrollment.client.fullname}
                    subtitle={enrollment.domainLabel}
                />
            </Card.PrimaryAction>
        </Card>
    );
}