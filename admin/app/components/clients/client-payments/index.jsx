import React, { useState, useCallback } from 'react';
import {
    Card,
    Icon,
    IconButton,
    List,
    Typography
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';

import { useActions } from 'app/hooks/store';
import PaymentForm from 'app/components/payments/payment-form';

export default function ClientPayments({ client }) {
    const actions = useActions('payments');

    const [payment, setPayment] = useState();

    const [isCreateFormOpen, toggleCreateFormOpen] = useBoolean(false);
    const [isEditFormOpen, toggleEditFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const createPayment = useCallback(data => {
        data.client = client.id;

        actions.createPayment(data)
            .then(() => toggleCreateFormOpen(false));
    }, [client]);

    const updatePayment = useCallback(data => {
        actions.updatePayment(payment.id, data)
            .then(() => toggleEditFormOpen(false));
    }, [payment]);

    const deletePayment = useCallback(() => {
        actions.deletePayment(payment.id)
            .then(() => toggleConfirmationDialogOpen(false));
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

    const payments = client?.payments;

    return (
        <section className="client-payments">
            <Card>
                <Card.Header
                    title="Платежи"
                    actions={
                        <IconButton
                            icon="add"
                            title="Создать платеж"
                            onClick={toggleCreateFormOpen}
                        />
                    }
                />

                {payments?.length > 0 ?
                    <List className="payments-list" twoLine>
                        {payments.map(payment =>
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
                    :
                    <Card.Section primary>
                        <Typography noMargin>Платежей нет</Typography>
                    </Card.Section>
                }
            </Card>

            <FormDialog
                form="create-payment-form"
                title="Новый платеж"
                open={isCreateFormOpen}
                onClose={toggleCreateFormOpen}
            >
                <PaymentForm
                    id="create-payment-form"
                    payment={{}}
                    onSubmit={createPayment}
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
                    onSubmit={updatePayment}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить платеж?"
                open={isConfirmationDialogOpen}
                onConfirm={deletePayment}
                onClose={() => toggleConfirmationDialogOpen(false)}
            />
        </section>
    );
}