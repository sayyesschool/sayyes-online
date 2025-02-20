import { useCallback } from 'react';

import EnrollmentScheduleForm from 'shared/components/enrollment-schedule-form';
import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';
import WeekSchedule from 'shared/components/week-schedule';
import { useBoolean } from 'shared/hooks/state';

export default function EnrollmentSchedule({ enrollment, onUpdate }) {
    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    const handleSubmit = useCallback(data => {
        onUpdate(data)
            .then(() => toggleFormOpen(false));
    }, []);

    const hasSchedule = enrollment.schedule?.length > 0;

    return (
        <PageSection
            className="EnrollmentSchedule"
            title="Расписание"
            actions={[{
                key: 'edit',
                icon: hasSchedule ? 'edit' : 'add',
                onClick: toggleFormOpen
            }]}
            compact
        >
            {hasSchedule &&
                <WeekSchedule schedule={enrollment.schedule} />
            }

            <FormDialog
                title="Расписание занятий"
                form="enrollment-schedule-form"
                open={isFormOpen}
                scrollableContent={false}
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