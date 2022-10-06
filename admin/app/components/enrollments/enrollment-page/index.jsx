import { useCallback } from 'react';
import { Button, Flex, Grid } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import { useEnrollment } from 'shared/hooks/enrollments';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import Icon from 'shared/ui-components/icon';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import PageSidePanel from 'shared/components/page-side-panel';

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
        <Page id="enrollment-page" loading={!enrollment}>
            <PageHeader
                breadcrumbs={[
                    { text: enrollment.client.fullname, url: enrollment?.client.url }
                ]}
                title={enrollment.domainLabel}
                toolbar={[
                    (enrollment.client?.hhid && {
                        element: 'a',
                        href: `https://sayes.t8s.ru/Profile/${enrollment.client.hhid}`,
                        target: '_blank',
                        icon: 'link',
                        title: 'Открыть в Hollihop'
                    }),
                    <Button
                        key="comments"
                        icon={<Icon>comment</Icon>}
                        title="Открыть комментарии"
                        text
                        iconOnly
                        data-comments-count={enrollment.comments.length}
                        onClick={toggleSidePanel}
                    />,
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

            <PageContent>
                <EnrollmentMeta
                    enrollment={enrollment}
                />

                <EnrollmentStatus
                    enrollment={enrollment}
                    onUpdate={updateEnrollment}
                />

                <Grid columns="minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr)">
                    <Flex gap="gap.medium" column>
                        <EnrollmentDetails
                            enrollment={enrollment}
                        />
                    </Flex>

                    <Flex gap="gap.medium" column>
                        <EnrollmentLessons
                            enrollment={enrollment}
                        />

                        <EnrollmentComments
                            enrollment={enrollment}
                        />
                    </Flex>

                    <Flex gap="gap.medium" column>
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

                    {/* <EnrollmentTrialLesson
                        enrollment={enrollment}
                        onUpdate={updateEnrollment}
                    /> */}
                </Grid>
            </PageContent>

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