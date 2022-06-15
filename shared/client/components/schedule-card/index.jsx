import WeekSchedule from 'shared/components/week-schedule';
import PageSection from 'shared/components/page-section';

import './index.scss';

export default function ScheduleCard({ schedule }) {
    return (
        <PageSection className="schedule-card" title="Расписание">
            {schedule?.length > 0 &&
                <WeekSchedule
                    schedule={schedule}
                />
            }
        </PageSection>
    );
}