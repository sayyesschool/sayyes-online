import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    LayoutGrid as Grid
} from 'mdc-react';

import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import ConfirmationDialog from 'shared/components/confirmation-dialog';

import { useStore, useActions } from 'app/store';
import FormPanel from 'app/components/shared/form-panel';
import EnrollmentDetails from 'app/components/enrollments/enrollment-details';
import EnrollmentLessons from 'app/components/enrollments/enrollment-lessons';
import EnrollmentCourses from 'app/components/enrollments/enrollment-courses';
import EnrollmentPayments from 'app/components/enrollments/enrollment-payments';
import EnrollmentStatus from 'app/components/enrollments/enrollment-status';
import EnrollmentForm from 'app/components/enrollments/enrollment-form';

import './index.scss';

export default function EnrollmentPage({ match, history }) {
    const [enrollment, actions] = useStore('enrollments.single');
    const [managers] = useStore('managers.list');
    const lessonActions = useActions('lessons');
    const paymentActions = useActions('payments');

    const [isEnrollmentFormOpen, setEnrollmentFormOpen] = useState(false);
    const [isSidePanelOpen, setSidePanelOpen] = useState(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    useEffect(() => {
        actions.getEnrollment(match.params.enrollmentId);
    }, []);

    const handleEnrollmentSubmit = useCallback(data => {
        actions.updateEnrollment(data.id, data)
            .then(() => setEnrollmentFormOpen(false));
    }, []);

    const handleDeleteEnrollment = useCallback(() => {
        actions.deleteEnrollment(enrollment.id)
            .then(() => {
                history.push('/enrollments');
                setConfirmationDialogOpen(false);
            });
    }, [enrollment]);

    const handleCreateLesson = useCallback(data => {
        data.enrollment = enrollment.id;

        lessonActions.createLesson(data)
            .then(() => setLessonFormOpen(false));
    }, [enrollment]);

    const handleDeleteLesson = useCallback(lesson => {
        lessonActions.deleteLesson(lesson.id)
            .then(() => setLessonFormOpen(false));
    }, [enrollment]);

    const handleAddCourse = useCallback(course => {
        actions.updateEnrollment(enrollment.id, { courses: [course] });
    }, [enrollment]);

    const handleRemoveCourse = useCallback(course => {
        actions.updateEnrollment(enrollment.id, { courses: [course] });
    }, [enrollment]);

    const handleCreatePayment = useCallback(data => {
        data.enrollment = enrollment.id;
        data.client = enrollment.client.id;

        paymentActions.createPayment(data)
            .then(() => setPaymentFormOpen(false));
    }, [enrollment]);

    const handleEdit = useCallback(() => {
        setEnrollmentFormOpen(true);
    }, []);

    const handleDelete = useCallback(() => {
        setConfirmationDialogOpen(true);
    }, []);

    return (
        <Page id="enrollment" loading={!enrollment}>
            <PageHeader
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
                            onEdit={handleEdit}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <EnrollmentLessons
                            enrollment={enrollment}
                            onCreate={handleCreateLesson}
                            onDelete={handleDeleteLesson}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <EnrollmentCourses
                            enrollment={enrollment}
                            onAdd={handleAddCourse}
                            onRemove={handleRemoveCourse}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <EnrollmentPayments
                            enrollment={enrollment}
                            onCreate={handleCreatePayment}
                        />
                    </Grid.Cell>
                </Grid>
            </PageContent>

            <FormPanel
                title="Редактирование обучения"
                form="enrollment-form"
                open={isEnrollmentFormOpen}
                onClose={() => setEnrollmentFormOpen(false)}
            >
                <EnrollmentForm
                    enrollment={enrollment}
                    managers={managers}
                    onSubmit={handleEnrollmentSubmit}
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