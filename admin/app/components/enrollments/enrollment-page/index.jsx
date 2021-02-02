import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    LayoutGrid as Grid
} from 'mdc-react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore, useActions } from 'app/hooks/store';
import FormPanel from 'app/components/shared/form-panel';
import EnrollmentDetails from 'app/components/enrollments/enrollment-details';
import EnrollmentLessons from 'app/components/enrollments/enrollment-lessons';
import EnrollmentCourses from 'app/components/enrollments/enrollment-courses';
import EnrollmentMaterials from 'app/components/enrollments/enrollment-materials';
import EnrollmentPayments from 'app/components/enrollments/enrollment-payments';
import EnrollmentForm from 'app/components/enrollments/enrollment-form';

import './index.scss';

export default function EnrollmentPage({ match, history }) {
    const [enrollment, actions] = useStore('enrollments.single');

    const [isEnrollmentFormOpen, setEnrollmentFormOpen] = useState(false);
    const [isSidePanelOpen, setSidePanelOpen] = useState(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    useEffect(() => {
        actions.getEnrollment(match.params.enrollmentId);
    }, []);

    const handleUpdateEnrollment = useCallback(data => {
        actions.updateEnrollment(enrollment.id, data)
            .then(() => setEnrollmentFormOpen(false));
    }, [enrollment]);

    const handleDeleteEnrollment = useCallback(() => {
        actions.deleteEnrollment(enrollment.id)
            .then(() => {
                history.push('/enrollments');
                setConfirmationDialogOpen(false);
            });
    }, [enrollment]);

    const handleEdit = useCallback(() => {
        setEnrollmentFormOpen(true);
    }, []);

    const handleDelete = useCallback(() => {
        setConfirmationDialogOpen(true);
    }, []);

    if (!enrollment) return <LoadingIndicator />;

    return (
        <Page id="enrollment" loading={!enrollment}>
            <PageTopBar
                breadcrumbs={[
                    <Link to={enrollment?.client.url}>{enrollment?.client.fullname}</Link>
                ]}
                title={enrollment?.title}
                actions={[
                    {
                        key: 'delete',
                        title: 'Удалить',
                        icon: 'delete',
                        onClick: handleDelete
                    },
                    {
                        key: 'messages',
                        title: 'Переписка',
                        icon: 'forum',
                        onClick: () => setSidePanelOpen(isOpen => !isOpen)
                    }
                ]}
            />

            <PageContent>
                <Grid>
                    {/* <Grid.Cell span="3">
                        <EnrollmentStatus
                            enrollment={enrollment}
                        />
                    </Grid.Cell> */}

                    <Grid.Cell span="3">
                        <EnrollmentDetails
                            enrollment={enrollment}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <EnrollmentLessons
                            enrollment={enrollment}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <EnrollmentPayments
                            enrollment={enrollment}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <Grid.Cell grid>
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
                </Grid>
            </PageContent>

            <FormPanel
                form="enrollment-form"
                title="Редактирование обучения"
                open={isEnrollmentFormOpen}
                modal
                onClose={() => setEnrollmentFormOpen(false)}
            >
                <EnrollmentForm
                    enrollment={enrollment}
                    onSubmit={handleUpdateEnrollment}
                />
            </FormPanel>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить обучение?"
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteEnrollment}
                onClose={() => setConfirmationDialogOpen(false)}
            />
        </Page>
    );
}