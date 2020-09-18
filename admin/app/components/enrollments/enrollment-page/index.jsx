import React, { useState, useEffect, useCallback } from 'react';
import {
    LayoutGrid as Grid
} from 'mdc-react';

import { useStore, useActions } from 'app/store';
import Page from 'app/components/shared/page';
import PageHeader from 'app/components/shared/page-header';
import PageContent from 'app/components/shared/page-content';
import ConfirmationDialog from 'app/components/shared/confirmation-dialog';
import FormPanel from 'app/components/shared/form-panel';
import EnrollmentDetails from 'app/components/enrollments/enrollment-details';
import EnrollmentLessons from 'app/components/enrollments/enrollment-lessons';
import EnrollmentPayments from 'app/components/enrollments/enrollment-payments';
import EnrollmentStatus from 'app/components/enrollments/enrollment-status';
import EnrollmentForm from 'app/components/enrollments/enrollment-form';
import LessonForm from 'app/components/lessons/lesson-form';
import PaymentForm from 'app/components/payments/payment-form';

import './index.scss';

export default function EnrollmentPage({ match, history }) {
    const [managers] = useStore('managers.list');
    const [enrollment, actions] = useStore('enrollments.single');
    const lessonActions = useActions('lessons');
    const paymentActions = useActions('payments');

    const [isEnrollmentFormOpen, setEnrollmentFormOpen] = useState(false);
    const [isLessonFormOpen, setLessonFormOpen] = useState(false);
    const [isPaymentFormOpen, setPaymentFormOpen] = useState(false);
    const [isSidePanelOpen, setSidePanelOpen] = useState(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    useEffect(() => {
        actions.getEnrollment(match.params.enrollmentId);
    }, []);

    const handleEnrollmentSubmit = useCallback(data => {
        actions.updateEnrollment(data.id, data)
            .then(() => setEnrollmentFormOpen(false));
    }, []);

    const handleLessonSubmit = useCallback(data => {
        data.enrollment = enrollment.id;

        lessonActions.createLesson(data)
            .then(() => setLessonFormOpen(false));
    }, [enrollment]);

    const handlePaymentSubmit = useCallback(data => {
        data.enrollment = enrollment.id;
        data.client = enrollment.client.id;

        paymentActions.createPayment(data)
            .then(() => setPaymentFormOpen(false));
    }, [enrollment]);

    const handleEdit = useCallback(() => {
        setEnrollmentFormOpen(true);
    }, []);

    const handleCreateLesson = useCallback(() => {
        setLessonFormOpen(true);
    }, []);

    const handleCreatePayment = useCallback(() => {
        setPaymentFormOpen(true);
    }, []);

    const handleDelete = useCallback(() => {
        setConfirmationDialogOpen(true);
    }, []);

    const deleteEnrollment = useCallback(() => {
        actions.deleteEnrollment(enrollment.id)
            .then(() => {
                history.push('/enrollments');
                setConfirmationDialogOpen(false);
            });
    }, [enrollment]);

    return (
        <Page id="enrollment" loading={!enrollment}>
            <PageHeader
                title={enrollment && `${enrollment.client.fullname} - ${enrollment.title}`}
                backTo={enrollment?.client.url}
                controls={[
                    {
                        key: 'edit',
                        title: 'Изменить',
                        icon: 'edit',
                        onClick: handleEdit
                    },
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
                    <Grid.Cell span="3">
                        <EnrollmentStatus
                            enrollment={enrollment}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <EnrollmentDetails
                            enrollment={enrollment}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <EnrollmentLessons
                            enrollment={enrollment}
                            onCreate={handleCreateLesson}
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

            <FormPanel
                title="Новое занятие"
                form="lesson-form"
                open={isLessonFormOpen}
                onClose={() => setLessonFormOpen(false)}
            >
                <LessonForm
                    lesson={{
                        client: enrollment?.client
                    }}
                    onSubmit={handleLessonSubmit}
                />
            </FormPanel>

            <FormPanel
                title="Новый платеж"
                form="payment-form"
                open={isPaymentFormOpen}
                onClose={() => setPaymentFormOpen(false)}
            >
                <PaymentForm
                    payment={{
                        client: enrollment?.client
                    }}
                    onSubmit={handlePaymentSubmit}
                />
            </FormPanel>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить обучение?"
                open={isConfirmationDialogOpen}
                onConfirm={deleteEnrollment}
                onClose={() => setConfirmationDialogOpen(false)}
            />
        </Page>
    );
}