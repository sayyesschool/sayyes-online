import { useCallback } from 'react';

import ConfirmButton from 'shared/components/confirm-button';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { DomainLabel } from 'shared/data/common';
import { useEnrollment } from 'shared/hooks/enrollments';
import { useBoolean } from 'shared/hooks/state';
import { Flex, Grid } from 'shared/ui-components';

import EnrollmentComments from 'crm/components/enrollments/enrollment-comments';
import EnrollmentCourses from 'crm/components/enrollments/enrollment-courses';
import EnrollmentDetails from 'crm/components/enrollments/enrollment-details';
import EnrollmentForm from 'crm/components/enrollments/enrollment-form';
import EnrollmentLessons from 'crm/components/enrollments/enrollment-lessons';
import EnrollmentMaterials from 'crm/components/enrollments/enrollment-materials';
import EnrollmentMeta from 'crm/components/enrollments/enrollment-meta';
// import EnrollmentPayments from 'crm/components/enrollments/enrollment-payments';
import EnrollmentSchedule from 'crm/components/enrollments/enrollment-schedule';
import EnrollmentStatus from 'crm/components/enrollments/enrollment-status';

// import EnrollmentTrialLesson from 'crm/components/enrollments/enrollment-trial-lesson';
import './EnrollmentPage.scss';

export default function EnrollmentPage({ match, history }) {
    const [enrollment, actions] = useEnrollment(match.params.enrollmentId);

    const [isEnrollmentFormOpen, toggleEnrollmentFormOpen] = useBoolean(false);

    const updateEnrollment = useCallback(data => {
        return actions.updateEnrollment(enrollment.id, data)
            .then(() => toggleEnrollmentFormOpen(false));
    }, [enrollment, actions, toggleEnrollmentFormOpen]);

    const updateEnrollmentSchedule = useCallback(data => {
        return actions.updateSchedule(enrollment.id, data);
    }, [enrollment, actions]);

    const deleteEnrollment = useCallback(() => {
        return actions.deleteEnrollment(enrollment.id)
            .then(() => {
                history.push(`/learners/${enrollment.learnerId}`);
            });
    }, [enrollment, actions, history]);

    if (!enrollment) return <LoadingIndicator />;

    return (
        <Page className="EnrollmentPage">
            <Page.Header
                breadcrumbs={[
                    { content: enrollment.learner.fullname, to: enrollment?.learner.url }
                ]}
                title={DomainLabel[enrollment.domain]}
                actions={[
                    (enrollment.learner?.hhid && {
                        key: 'hhid',
                        element: 'a',
                        href: `https://sayes.t8s.ru/Profile/${enrollment.learner.hhid}`,
                        target: '_blank',
                        icon: 'link',
                        title: 'Открыть в Hollihop'
                    }),
                    {
                        key: 'edit',
                        title: 'Изменить',
                        icon: 'edit',
                        onClick: toggleEnrollmentFormOpen
                    },
                    <ConfirmButton
                        key="delete"
                        message="Вы действительно хотите удалить обучение?"
                        icon="delete"
                        color="neutral"
                        variant="plain"
                        onConfirm={deleteEnrollment}
                    />
                ]}
            />

            <Page.Content>
                <EnrollmentMeta
                    enrollment={enrollment}
                />

                <EnrollmentStatus
                    enrollment={enrollment}
                    onUpdate={updateEnrollment}
                />

                <Grid spacing={2}>
                    <Grid.Item xs={3}>
                        <Flex gap="medium" column>
                            <EnrollmentDetails
                                enrollment={enrollment}
                            />
                        </Flex>
                    </Grid.Item>

                    <Grid.Item xs={6}>
                        <Flex gap="medium" column>
                            <EnrollmentLessons
                                enrollment={enrollment}
                            />

                            <EnrollmentComments
                                enrollment={enrollment}
                            />
                        </Flex>
                    </Grid.Item>

                    <Grid.Item xs={3}>
                        <Flex gap="medium" column>
                            <EnrollmentSchedule
                                enrollment={enrollment}
                                onUpdate={updateEnrollmentSchedule}
                            />

                            {/* <EnrollmentPayments
                            enrollment={enrollment}
                        /> */}

                            <EnrollmentCourses
                                enrollment={enrollment}
                            />

                            <EnrollmentMaterials
                                enrollment={enrollment}
                            />
                        </Flex>
                    </Grid.Item>

                    {/* <EnrollmentTrialLesson
                        enrollment={enrollment}
                        onUpdate={updateEnrollment}
                    /> */}
                </Grid>
            </Page.Content>

            <FormDialog
                form="enrollment-form"
                title="Редактирование обучения"
                open={isEnrollmentFormOpen}
                onClose={toggleEnrollmentFormOpen}
            >
                <EnrollmentForm
                    id="enrollment-form"
                    enrollment={enrollment}
                    onSubmit={updateEnrollment}
                />
            </FormDialog>
        </Page>
    );
}