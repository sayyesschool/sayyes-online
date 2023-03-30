import { useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { useEnrollment } from 'shared/hooks/enrollments';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { Badge, Flex, IconButton, Grid } from 'shared/ui-components';

import EnrollmentForm from 'app/components/enrollments/enrollment-form';
import EnrollmentComments from 'app/components/enrollments/enrollment-comments';
import EnrollmentCourses from 'app/components/enrollments/enrollment-courses';
import EnrollmentDetails from 'app/components/enrollments/enrollment-details';
import EnrollmentMeta from 'app/components/enrollments/enrollment-meta';
import EnrollmentLessons from 'app/components/enrollments/enrollment-lessons';
import EnrollmentMaterials from 'app/components/enrollments/enrollment-materials';
// import EnrollmentPayments from 'app/components/enrollments/enrollment-payments';
import EnrollmentStatus from 'app/components/enrollments/enrollment-status';
import EnrollmentSchedule from 'app/components/enrollments/enrollment-schedule';
// import EnrollmentTrialLesson from 'app/components/enrollments/enrollment-trial-lesson';

import './index.scss';

export default function EnrollmentPage({ match, history }) {
    const [enrollment, actions] = useEnrollment(match.params.enrollmentId);

    const [isSidePanelOpen, toggleSidePanel] = useBoolean(false);
    const [isEnrollmentFormOpen, toggleEnrollmentFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const updateEnrollment = useCallback(data => {
        return actions.updateEnrollment(enrollment.id, data)
            .then(() => toggleEnrollmentFormOpen(false));
    }, [enrollment]);

    const updateEnrollmentSchedule = useCallback(data => {
        return actions.updateSchedule(enrollment.id, data);
    }, [enrollment]);

    const deleteEnrollment = useCallback(() => {
        return actions.deleteEnrollment(enrollment.id)
            .then(() => {
                history.push(`/clients/${enrollment.client.id}`);
                toggleConfirmationDialogOpen(false);
            });
    }, [enrollment]);

    if (!enrollment) return <LoadingIndicator />;

    return (
        <Page className="sy-EnrollmentPage">
            <Page.Header
                breadcrumbs={[
                    { content: enrollment.client.fullname, to: enrollment?.client.url }
                ]}
                title={enrollment.domainLabel}
                actions={[
                    (enrollment.client?.hhid && {
                        key: 'hhid',
                        element: 'a',
                        href: `https://sayes.t8s.ru/Profile/${enrollment.client.hhid}`,
                        target: '_blank',
                        icon: 'link',
                        title: 'Открыть в Hollihop'
                    }),
                    <Badge key="comments" badgeContent={enrollment.comments.length}>
                        <IconButton
                            icon="comment"
                            title="Открыть комментарии"
                            color="neutral"
                            size="sm"
                            variant="soft"
                            onClick={toggleSidePanel}
                        />
                    </Badge>,
                    {
                        key: 'edit',
                        title: 'Изменить',
                        icon: 'edit',
                        onClick: toggleEnrollmentFormOpen
                    },
                    {
                        key: 'delete',
                        title: 'Удалить',
                        icon: 'delete',
                        onClick: toggleConfirmationDialogOpen
                    }
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

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить обучение?"
                open={isConfirmationDialogOpen}
                onConfirm={deleteEnrollment}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}