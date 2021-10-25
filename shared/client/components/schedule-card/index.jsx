import {
    Card
} from 'mdc-react';

import WeekSchedule from 'shared/components/week-schedule';

import './index.scss';

export default function ScheduleCard({ schedule }) {
    return (
        <Card className="schedule-card">
            <Card.Header
                title="Расписание"
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