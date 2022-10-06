import { useCallback } from 'react';
import { Button } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';
import Icon from 'shared/ui-components/icon';
import EnrollmentScheduleForm from 'shared/components/enrollment-schedule-form';
import WeekSchedule from 'shared/components/week-schedule';
import PageSection from 'shared/components/page-section';

import './index.scss';

export default function EnrollmentSchedule({ enrollment, onUpdate }) {
    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    const handleSubmit = useCallback(data => {
        onUpdate(data)
            .then(() => toggleFormOpen(false));
    }, []);

    return (
        <PageSection
            className="enrollment-schedule"
            title="Расписание"
            actions={
                <Button
                    icon={<Icon>edit</Icon>}
                    text
                    iconOnly
                    onClick={toggleFormOpen}
                />
            }
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