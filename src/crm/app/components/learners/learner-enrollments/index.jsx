import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';
import { useBoolean } from 'shared/hooks/state';

import EnrollmentForm from 'crm/components/enrollments/enrollment-form';
import EnrollmentsList from 'crm/components/enrollments/enrollments-list';
import { useActions } from 'crm/hooks/store';

export default function LearnerEnrollments({ learner, manager }) {
    const history = useHistory();
    const enrollmentActions = useActions('enrollments');

    const [isEnrollmentFormOpen, toggleEnrollmentFormOpen] = useBoolean(false);

    const createEnrollment = useCallback(data => {
        return enrollmentActions.createEnrollment(data)
            .then(({ data }) => history.push(`/learners/${learner?.id}/enrollments/${data?.id}`));
    }, [learner]);

    const enrollments = learner?.enrollments.map(enrollment => ({ ...enrollment, url: `${learner.url}${enrollment.url}` }));

    return (
        <PageSection
            className="LearnerEnrollments"
            title="Обучение"
            actions={[
                {
                    key: 'add',
                    icon: 'add',
                    title: 'Создать обучение',
                    onClick: toggleEnrollmentFormOpen
                }
            ]}
            compact
        >
            <EnrollmentsList
                enrollments={enrollments}
            />

            <FormDialog
                form="enrollment-form"
                title="Новое обучение"
                open={isEnrollmentFormOpen}
                onClose={toggleEnrollmentFormOpen}
            >
                <EnrollmentForm
                    id="enrollment-form"
                    enrollment={{
                        learnerId: learner.id,
                        managerId: manager.id
                    }}
                    onSubmit={createEnrollment}
                />
            </FormDialog>
        </PageSection>
    );
}