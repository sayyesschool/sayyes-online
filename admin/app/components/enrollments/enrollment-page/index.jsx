import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    LayoutGrid as Grid
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import EnrollmentForm from 'app/components/enrollments/enrollment-form';
import EnrollmentCommentsSidePanel from 'app/components/enrollments/enrollment-comments-side-panel';
import EnrollmentCourses from 'app/components/enrollments/enrollment-courses';
import EnrollmentDetails from 'app/components/enrollments/enrollment-details';
import EnrollmentMeta from 'app/components/enrollments/enrollment-meta';
import EnrollmentLessons from 'app/components/enrollments/enrollment-lessons';
import EnrollmentMaterials from 'app/components/enrollments/enrollment-materials';
import EnrollmentPayments from 'app/components/enrollments/enrollment-payments';
import EnrollmentStatus from 'app/components/enrollments/enrollment-status';
import EnrollmentSchedule from 'app/components/enrollments/enrollment-schedule';
import EnrollmentTrialLesson from 'app/components/enrollments/enrollment-trial-lesson';

import './index.scss';

export default function EnrollmentPage({ match, history }) {
    const [enrollment, actions] = useStore('enrollments.single');

    const [isSidePanelOpen, toggleSidePanel] = useBoolean(false);
    const [isEnrollmentFormOpen, toggleEnrollmentFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        actions.getEnrollment(match.params.enrollmentId);
    }, []);

    const updateEnrollment = useCallback(data => {
        return actions.updateEnrollment(enrollment.id, data)
            .then(() => toggleEnrollmentFormOpen(false));
    }, [enrollment]);

    const deleteEnrollment = useCallback(() => {
        return actions.deleteEnrollment(enrollment.id)
            .then(() => {
                history.push(`/clients/${enrollment.client}`);
                toggleConfirmationDialogOpen(false);
            });
    }, [enrollment]);

    if (!enrollment) return <LoadingIndicator />;

    return (
        <>
            <EnrollmentCommentsSidePanel
                enrollment={enrollment}
                open={isSidePanelOpen}
                modal
                onClose={toggleSidePanel}
            />

            <Page id="enrollment-page" loading={!enrollment}>
                <PageTopBar
                    breadcrumbs={[
                        <Link to={enrollment?.client.url}>{enrollment.client.fullname}</Link>
                    ]}
                    title={enrollment.title}
                    actions={[
                        (enrollment.client && {
                            element: 'a',
                            href: `https://sayes.t8s.ru/Profile/${enrollment.client.hhid}`,
                            target: '_blank',
                            icon: 'link',
                            title: 'Открыть в Hollihop'
                        }),
                        {
                            key: 'comment',
                            title: 'Открыть комментарии',
                            icon: 'comment',
                            onClick: toggleSidePanel
                        },
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
                    <Grid>
                        <Grid.Cell span="12">
                            <EnrollmentMeta
                                enrollment={enrollment}
                            />
                        </Grid.Cell>

                        <Grid.Cell span="12">
                            <EnrollmentStatus
                                enrollment={enrollment}
                                onUpdate={updateEnrollment}
                            />
                        </Grid.Cell>

                        <Grid.Cell desktop="3" tablet="4" mobile="4">
                            <EnrollmentDetails
                                enrollment={enrollment}
                            />
                        </Grid.Cell>

                        <Grid.Cell desktop="3" tablet="4" mobile="4">
                            <Grid.Cell grid>
                                <Grid.Cell span="12">
                                    <EnrollmentSchedule
                                        enrollment={enrollment}
                                        onUpdate={updateEnrollment}
                                    />
                                </Grid.Cell>

                                <Grid.Cell span="12">
                                    <EnrollmentTrialLesson
                                        enrollment={enrollment}
                                        onUpdate={updateEnrollment}
                                    />
                                </Grid.Cell>

                                <Grid.Cell span="12">
                                    <EnrollmentCourses
                                        enrollment={enrollment}
                                    />
                                </Grid.Cell>

                                <Grid.Cell span="12">
                                    <EnrollmentMaterials
                                        enrollment={enrollment}
                                    />
                                </Grid.Cell>
                            </Grid.Cell>
                        </Grid.Cell>

                        <Grid.Cell desktop="3" tablet="4" mobile="4">
                            <EnrollmentLessons
                                enrollment={enrollment}
                            />

                        </Grid.Cell>

                        <Grid.Cell desktop="3" tablet="4" mobile="4">
                            <EnrollmentPayments
                                enrollment={enrollment}
                            />
                        </Grid.Cell>
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
        </>
    );
}