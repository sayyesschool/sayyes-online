import PageSection from 'shared/components/page-section';
import WeekSchedule from 'shared/components/week-schedule';

import './index.scss';

export default function EnrollmentSchedule({ enrollment }) {
    return (
        <PageSection className="enrollment-schedule" title="Расписание" compact>
            {enrollment.schedule?.length > 0 &&
                <WeekSchedule
                    schedule={enrollment.schedule}
                />
            }
        </PageSection>
    );
}