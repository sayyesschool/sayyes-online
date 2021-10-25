import ScheduleCard from 'shared/components/schedule-card';

import './index.scss';

export default function EnrollmentSchedule({ enrollment }) {
    return (
        <section className="enrollment-schedule">
            <ScheduleCard
                schedule={enrollment.schedule}
            />
        </section>
    );
}