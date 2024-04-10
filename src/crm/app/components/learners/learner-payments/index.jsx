import { useCallback, useState } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';
import { useBoolean } from 'shared/hooks/state';

import PaymentForm from 'crm/components/payments/payment-form';
import PaymentsList from 'crm/components/payments/payments-list';
import { useActions } from 'crm/store';

export default function LearnerPayments({ learner }) {
    const actions = useActions('payments');

    const [payment, setPayment] = useState();

    const [isCreateFormOpen, toggleCreateFormOpen] = useBoolean(false);
    const [isEditFormOpen, toggleEditFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const createPayment = useCallback(data => {
        data.learner = learner.id;

        return actions.createPayment(data)
            .finally(() => toggleCreateFormOpen(false));
    }, [learner]);

    const updatePayment = useCallback(data => {
        return actions.updatePayment(payment.id, data)
            .finally(() => toggleEditFormOpen(false));
    }, [payment]);

    const deletePayment = useCallback(() => {
        return actions.deletePayment(payment.id)
            .finally(() => toggleConfirmationDialogOpen(false));
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

    const payments = learner?.payments;

    return (
        <PageSection
            className="LearnerPayments"
            title="Платежи"
            actions={[{
                key: 'add',
                icon: 'add',
                title: 'Создать платеж',
                onClick: toggleCreateFormOpen
            }]}
            compact
        >
            {payments?.length > 0 &&
                <PaymentsList
                    payments={payments}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            }

            <FormDialog
                form="create-payment-form"
                title="Новый платеж"
                open={isCreateFormOpen}
                onClose={toggleCreateFormOpen}
            >
                <PaymentForm
                    id="create-payment-form"
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
                onClose={toggleConfirmationDialogOpen}
            />
        </PageSection>
    );
}