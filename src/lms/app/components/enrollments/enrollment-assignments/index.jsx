import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import AssignmentsList from 'shared/components/assignments-list';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import PageSection from 'shared/components/page-section';
import { IconButton } from 'shared/ui-components';

import { useActions } from 'app/store/hooks';

export default function EnrollmentAssignments({ enrollment, readonly }) {
    const enrollmentActions = useActions('enrollments');

    const [assignmentId, setAssignmentId] = useState();
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleCreateAssignment = useCallback(assignmentId => {
        const courses = enrollment.courses.concat(assignmentId);

        return enrollmentActions.updateEnrollment(enrollment.id, { courses });
    }, [enrollment]);

    const handleDeleteAssignment = useCallback(() => {
        const courses = enrollment.courses.filter(id => id !== assignmentId);

        return enrollmentActions.updateEnrollment(enrollment.id, { courses })
            .then(() => toggleConfirmationDialogOpen(false));
    }, [enrollment, assignmentId]);

    const handleDeleteAssignmentRequest = useCallback(assignmentId => {
        setAssignmentId(assignmentId);
        toggleConfirmationDialogOpen(true);
    }, [enrollment]);

    return (
        <PageSection
            className="EnrollmentAssignments"
            title="Задания"
            actions={!readonly &&
                <IconButton
                    icon="add"
                    title="Создать задание"
                    size="sm"
                />
            }
            compact
            plain
        >
            {enrollment.assignments?.length > 0 &&
                <AssignmentsList
                    assignments={enrollment.assignments}
                    onRemove={!readonly && handleDeleteAssignmentRequest}
                />
            }

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить задание?"
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteAssignment}
                onClose={() => toggleConfirmationDialogOpen(false)}
            />
        </PageSection>
    );
}