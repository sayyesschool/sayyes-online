import React, { useState, useCallback } from 'react';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';

import { useActions } from 'app/hooks/store';
import PaymentForm from 'app/components/payments/payment-form';

export default function EnrollmentPayments({ enrollment }) {
    const actions = useActions('payments');

    const [payment, setPayment] = useState();

    const [isCreateFormOpen, toggleCreateFormOpen] = useBoolean(false);
    const [isEditFormOpen, toggleEditFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleCreatePayment = useCallback(data => {
        data.enrollment = enrollment.id;
        data.client = enrollment.client.id;

        actions.createPayment(data)
            .then(() => toggleCreateFormOpen(false));
    }, [enrollment]);

    const handleUpdatePayment = useCallback(data => {
        actions.updatePayment(payment.id, data)
            .then(() => toggleEditFormOpen(false));
    }, [payment]);

    const handleDeletePayment = useCallback(() => {
        if (confirm('Вы уверены что хотите удалить урок?')) {
            actions.deletePayment(payment.id);
        }
    }, [payment]);

    const handleUpdate = useCallback(payment => {
        setPayment(payment);
        toggleEditFormOpen(true);
    }, []);

    const handleDelete = useCallback((event, payment) => {
        event.stopPropagation();

        setPayment(payment);
        toggleConfirmationDialogOpen(true);
    }, []);

    return (
        <section className="enrollment-payments">
            <Card>
                <Card.Header
                    title="Платежи"
                    subtitle={enrollment.payments.length === 0 && 'Платежей нет'}
                    actions={
                        <IconButton
                            icon="add"
                            onClick={toggleCreateFormOpen}
                        />
                    }
                />

                {enrollment.payments.length > 0 &&
                    <Card.Section>
                        <List twoLine>
                            {enrollment.payments.map(payment =>
                                <List.Item
                                    key={payment.id}
                                    graphic={<Icon>{payment.statusIcon}</Icon>}
                                    primaryText={payment.description}
                                    secondaryText={`${payment.amount} руб.`}
                                    meta={
                                        <IconButton
                                            icon="remove"
                                            title="Удалить платеж"
                                            onClick={event => handleDelete(event, payment)}
                                        />
                                    }
                                    onClick={() => handleUpdate(payment)}
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>

            <FormDialog
                form="create-payment-form"
                title="Новый платеж"
                open={isCreateFormOpen}
                modal
                onClose={toggleCreateFormOpen}
            >
                <PaymentForm
                    id="create-payment-form"
                    payment={{
                        client: enrollment?.client
                    }}
                    onSubmit={handleCreatePayment}
                />
            </FormDialog>

            <FormDialog
                form="edit-payment-form"
                title="Редактирование платежа"
                open={isEditFormOpen}
                onClose={toggleEditFormOpen}
            >
                <PaymentForm
                    id="edit-payment-form"
                    payment={payment}
                    onSubmit={handleUpdatePayment}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить платеж?"
                open={isConfirmationDialogOpen}
                onConfirm={handleDeletePayment}
                onClose={() => toggleConfirmationDialogOpen(false)}
            />
        </section>
    );
}