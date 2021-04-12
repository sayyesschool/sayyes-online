import React from 'react';
import {
    Avatar,
    ChipSet, Chip,
    Icon,
} from 'mdc-react';

import './index.scss';

export default function EnrollmentDetails({ enrollment }) {
    return (
        <section className="enrollment-details">
            <ChipSet>
                <Chip
                    icon={<Icon>portrait</Icon>}
                    text={enrollment.ageLabel}
                    title="Возрастная группа"
                    outlined
                />

                <Chip
                    icon={<Icon>signal_cellular_alt</Icon>}
                    text={enrollment.levelLabel}
                    title="Уровень"
                    outlined
                />

                <Chip
                    icon={<Icon>flag</Icon>}
                    text={enrollment.purposeLabel}
                    title="Цель"
                    outlined
                />
            </ChipSet>

            <ChipSet>
                <Chip
                    className="person-chip"
                    icon={<Avatar src={enrollment.manager?.imageUrl} />}
                    text={enrollment.manager?.fullname}
                    title="Менеджер"
                    outlined
                />

                <Chip
                    className="person-chip"
                    icon={<Avatar src={enrollment.teacher?.imageUrl} />}
                    text={enrollment.teacher?.fullname}
                    title="Преподаватель"
                    outlined
                />
            </ChipSet>
        </section>
    );
}