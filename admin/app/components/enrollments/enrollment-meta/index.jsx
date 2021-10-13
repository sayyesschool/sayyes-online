import React from 'react';
import {
    Avatar,
    Chip,
    Typography
} from 'mdc-react';

import './index.scss';

export default function EnrollmentMeta({ enrollment }) {
    return (
        <section className="enrollment-meta">
            <div className="enrollment-meta__section">
                <Typography type="subtitle2" noMargin>{enrollment.managers.length > 1 ? 'Менеджеры' : 'Менеджер'}: </Typography>

                {enrollment.managers.map(manager =>
                    <Chip
                        key={manager.id}
                        className="person-chip"
                        icon={<Avatar src={manager?.imageUrl} text={manager?.initials} />}
                        text={manager?.fullname}
                        title="Менеджер"
                        outlined
                    />
                )}
            </div>

            <div className="enrollment-meta__section">
                <Typography type="subtitle2" noMargin>{enrollment.managers.length > 1 ? 'Преподаватели' : 'Преподаватель'}: </Typography>

                {enrollment.teachers.map(teacher =>
                    <Chip
                        key={teacher.id}
                        className="person-chip"
                        icon={<Avatar src={teacher?.imageUrl} text={teacher?.initials} />}
                        text={teacher?.fullname}
                        title="Преподаватель"
                        outlined
                    />
                )}
            </div>
        </section>
    );
}