import { useCallback, useState } from 'react';
import { Button } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import Icon from 'shared/ui-components/icon';
import PageSection from 'shared/components/page-section';

import { useActions } from 'app/hooks/store';
import PaymentForm from 'app/components/payments/payment-form';
import PaymentsList from 'app/components/payments/payments-list';

export default function EnrollmentPayments({ enrollment }) {
    const actions = useActions('payments');

    const [payment, setPayment] = useState();

    const [isCreateFormOpen, toggleCreateFormOpen] = useBoolean(false);
    const [isEditFormOpen, toggleEditFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const createPayment = useCallback(data => {
        data.client = enrollment.client.id;
        data.enrollment = enrollment.id;

        return actions.createPayment(data)
            .then(() => toggleCreateFormOpen(false));
    }, [enrollment]);

    const updatePayment = useCallback(data => {
        return actions.updatePayment(payment.id, data)
            .then(() => toggleEditFormOpen(false));
    }, [payment]);

    const deletePayment = useCallback(() => {
        return actions.deletePayment(payment.id)
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

    return (
        <PageSection
            className="enrollment-payments"
            title="Платежи"
            actions={
                <Button
                    icon={<Icon>add</Icon>}
                    text
                    iconOnly
                    onClick={toggleCreateFormOpen}
                />
            }
        >
            {enrollment.payments?.length > 0 &&
                <PaymentsList
                    payments={enrollment.payments}
                    onClick={handleUpdate}
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
        </PageSection>
    );
}