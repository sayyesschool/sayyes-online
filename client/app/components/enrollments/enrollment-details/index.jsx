import React from 'react';
import {
    Avatar,
    ChipSet, Chip,
    Tooltip
} from 'mdc-react';

import './index.scss';

export default function EnrollmentDetails({ enrollment }) {
    return (
        <section className="enrollment-details">
            <ChipSet>
                <Tooltip label="Преподаватель">
                    <Chip
                        className="person-chip"
                        icon={<Avatar src={enrollment.teacher?.imageUrl} />}
                        text={enrollment.teacher?.fullname}
                    />
                </Tooltip>

                <Tooltip label="Преподаватель">
                    <Chip
                        className="person-chip"
                        icon={<Avatar src={enrollment.manager?.imageUrl} />}
                        text={enrollment.manager?.fullname}
                    />
                </Tooltip>
            </ChipSet>
        </section>
    );
}