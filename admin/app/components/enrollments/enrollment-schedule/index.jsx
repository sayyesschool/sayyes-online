import React, { useState, useCallback } from 'react';
import {
    Card,
    IconButton
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';
import WeekSchedule from 'shared/components/week-schedule';
import ScheduleSelect from 'shared/components/schedule-select';

import './index.scss';

export default function EnrollmentSchedule({ enrollment, onUpdate }) {
    const [schedule, setSchedule] = useState(enrollment.schedule);

    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    const handleChange = useCallback((event, value) => {
        setSchedule(value);
    }, []);

    const handleSubmit = useCallback(() => {
        onUpdate({ schedule })
            .then(() => toggleFormOpen(false));
    }, [schedule]);

    return (
        <section className="enrollment-schedule">
            <Card>
                <Card.Header
                    title="Расписание"
                    actions={
                        <IconButton
                            icon="edit"
                            onClick={toggleFormOpen}
                        />
                    }
                />

                <Card.Section>
                    <WeekSchedule schedule={enrollment.schedule} />
                </Card.Section>
            </Card>

            <FormDialog
                title="Изменение расписания"
                open={isFormOpen}
                onClose={toggleFormOpen}
                onSubmit={handleSubmit}
            >
                <ScheduleSelect
                    label="Расписание"
                    schedule={schedule}
                    onChange={handleChange}
                />
            </FormDialog>
        </section>
    );
}