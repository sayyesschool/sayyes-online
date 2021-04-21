import React from 'react';
import {
    Avatar,
    Chip
} from 'mdc-react';

import './index.scss';

export default function EnrollmentMeta({ enrollment }) {
    return (
        <section className="enrollment-meta">
            <Chip
                className="person-chip"
                icon={<Avatar src={enrollment.manager?.imageUrl} text={enrollment.manager?.initials} />}
                text={enrollment.manager?.fullname}
                title="Менеджер"
                outlined
            />

            {enrollment.teacher &&
                <Chip
                    className="person-chip"
                    icon={<Avatar src={enrollment.teacher?.imageUrl} text={enrollment.teacher?.initials} />}
                    text={enrollment.teacher?.fullname}
                    title="Преподаватель"
                    outlined
                />
            }
        </section>
    );
}