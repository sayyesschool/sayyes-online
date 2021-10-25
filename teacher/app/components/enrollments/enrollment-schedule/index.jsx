import { useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';
import ScheduleCard from 'shared/components/schedule-card';
import EnrollmentScheduleForm from 'shared/components/enrollment-schedule-form';

import './index.scss';

export default function EnrollmentSchedule({ enrollment, onUpdate }) {
    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    const handleSubmit = useCallback(data => {
        onUpdate(data)
            .then(() => toggleFormOpen(false));
    }, []);

    return (
        <section className="enrollment-schedule">
            <ScheduleCard
                schedule={enrollment.schedule}
                editable
            />

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
        </section>
    );
}