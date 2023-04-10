import { useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';
import EnrollmentScheduleForm from 'shared/components/enrollment-schedule-form';
import WeekSchedule from 'shared/components/week-schedule';
import PageSection from 'shared/components/page-section';

export default function EnrollmentSchedule({ enrollment, onUpdate }) {
    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    const handleSubmit = useCallback(data => {
        onUpdate(data)
            .then(() => toggleFormOpen(false));
    }, []);

    return (
        <PageSection
            className="EnrollmentSchedule"
            title="Расписание"
            actions={[{
                key: 'edit',
                icon: 'edit',
                onClick: toggleFormOpen
            }]}
            compact
        >
            {enrollment.schedule?.length > 0 &&
                <WeekSchedule schedule={enrollment.schedule} />
            }

            <FormDialog
                title="Расписание занятий"
                form="enrollment-schedule-form"
                open={isFormOpen}
                onClose={toggleFormOpen}
            >
                <EnrollmentScheduleForm
                    id="enrollment-schedule-form"
                    enrollment={enrollment}
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </PageSection>
    );
}