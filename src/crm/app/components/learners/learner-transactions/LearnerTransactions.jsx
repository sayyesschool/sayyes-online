import { useCallback, useState } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';
import { useBoolean } from 'shared/hooks/state';
import { Tabs } from 'shared/ui-components';

import PaymentForm from 'crm/components/payments/payment-form';
import TransactionsList from 'crm/components/transactions/transactions-list';
import { useActions } from 'crm/store';

export default function LearnerTransactions({ learner }) {
    const actions = useActions('payments');

    const [payment, setPayment] = useState();
    const [view, setView] = useState('debit');

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

    const handleTabChange = useCallback((event, value) => {
        setView(value);
    }, []);

    const transactions = learner?.transactions;
    const debitTransactions = transactions.filter(t => t.type === 'debit');
    const creditTransactions = transactions.filter(t => t.type === 'credit');

    return (
        <PageSection
            className="LearnerTransactions"
            title="Платежи"
            actions={[
                {
                    key: 'add',
                    icon: 'add',
                    onClick: toggleCreateFormOpen
                }
            ]}
            header={
                <Tabs
                    value={view}
                    items={[
                        {
                            key: 'debit',
                            value: 'debit',
                            icon: 'add',
                            content: 'Поступления',
                            color: 'success'
                        },
                        {
                            key: 'credit',
                            value: 'credit',
                            icon: 'remove',
                            content: 'Списания',
                            color: 'danger'
                        }
                    ]}
                    size="sm"
                    variant="plain"
                    onChange={handleTabChange}
                />
            }
            compact
        >
            {transactions?.length > 0 &&
                <TransactionsList
                    transactions={view === 'debit' ? debitTransactions : creditTransactions}
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