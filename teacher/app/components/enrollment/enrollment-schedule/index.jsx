import React from 'react';
import {
    Card,
    Icon
} from 'mdc-react';

import WeekSchedule from 'shared/components/week-schedule';

import './index.scss';

export default function EnrollmentSchedule({ enrollment }) {
    return (
        <section className="enrollment-schedule">
            <Card>
                <Card.Header
                    graphic={<Icon>calendar_view_month</Icon>}
                    title="Расписание занятий"
                />

                {enrollment.schedule?.length > 0 &&
                    <Card.Section>
                        <WeekSchedule schedule={enrollment.schedule} />
                    </Card.Section>
                }
            </Card>
        </section>
    );
}