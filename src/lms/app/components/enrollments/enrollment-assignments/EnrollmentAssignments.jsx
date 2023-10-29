import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { useAssignmentActions } from 'shared/hooks/assignments';
import AssignmentsList from 'shared/components/assignments-list';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';
import { IconButton } from 'shared/ui-components';

import AssignmentForm from 'app/components/assignments/assignment-form';

export default function EnrollmentAssignments({
    enrollment,
    readonly
}) {
    const actions = useAssignmentActions();

    const [assignmentId, setAssignmentId] = useState();
    const [isCreateFormOpen, toggleCreateFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleCreateAssignment = useCallback(data => {
        data.enrollmentId = enrollment.id;
        data.teacherId = enrollment.teacherId;
        data.learnerId = enrollment.learnerId;

        console.log('createAssignment', enrollment, data);

        return actions.createAssignment(data)
            .then(() => toggleCreateFormOpen(false));
    }, [enrollment]);

    const handleDeleteAssignment = useCallback(() => {
        return actions.deleteAssignment(assignmentId)
            .then(() => toggleConfirmationDialogOpen(false));
    }, [assignmentId]);

    const handleDeleteAssignmentRequest = useCallback(assignmentId => {
        setAssignmentId(assignmentId);
        toggleConfirmationDialogOpen(true);
    }, []);

    return (
        <PageSection
            className="EnrollmentAssignments"
            title="Задания"
            actions={!readonly &&
                <IconButton
                    icon="add"
                    title="Создать задание"
                    size="sm"
                    onClick={toggleCreateFormOpen}
                />
            }
            compact
        >
            {enrollment.assignments?.length > 0 &&
                <AssignmentsList
                    assignments={enrollment.assignments}
                    onRemove={!readonly && handleDeleteAssignmentRequest}
                />
            }

            <FormDialog
                form="new-assignment-form"
                title="Новое задание"
                open={isCreateFormOpen}
                onClose={toggleCreateFormOpen}
            >
                <AssignmentForm
                    id="new-assignment-form"
                    onSubmit={handleCreateAssignment}
                />
            </FormDialog>

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