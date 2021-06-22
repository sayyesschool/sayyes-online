import React from 'react';
import {
    Card,
    IconButton
} from 'mdc-react';

import WeekSchedule from 'shared/components/week-schedule';

import './index.scss';

export default function ScheduleCard({ schedule, editable }) {
    return (
        <Card className="schedule-card">
            <Card.Header
                title="Расписание занятий"
                actions={editable &&
                    <IconButton
                        icon="edit"
                        onClick={toggleFormOpen}
                    />
                }
            />

            {schedule?.length > 0 &&
                <Card.Section>
                    <WeekSchedule
                        schedule={schedule}
                    />
                </Card.Section>
            }
        </Card>
    );
}