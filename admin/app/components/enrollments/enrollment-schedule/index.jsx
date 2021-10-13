import React, { useCallback } from 'react';
import {
    Card,
    Icon,
    IconButton
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';
import WeekSchedule from 'shared/components/week-schedule';
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
            <Card>
                <Card.Header
                    graphic={<Icon>calendar_view_month</Icon>}
                    title="Расписание"
                    actions={
                        <IconButton
                            icon="edit"
                            onClick={toggleFormOpen}
                        />
                    }
                />

                {enrollment.schedule?.length > 0 &&
                    <Card.Section>
                        <WeekSchedule schedule={enrollment.schedule} />
                    </Card.Section>
                }
            </Card>

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