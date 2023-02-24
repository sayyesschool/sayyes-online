import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Button, Icon, Tabs } from 'shared/ui-components';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';

import { useActions } from 'app/hooks/store';
import PaymentForm from 'app/components/payments/payment-form';
import TransactionsList from 'app/components/transactions/transactions-list';

export default function ClientTransactions({ client }) {
    const actions = useActions('payments');

    const [payment, setPayment] = useState();
    const [view, setView] = useState('debit');

    const [isCreateFormOpen, toggleCreateFormOpen] = useBoolean(false);
    const [isEditFormOpen, toggleEditFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const createPayment = useCallback(data => {
        data.client = client.id;

        return actions.createPayment(data)
            .finally(() => toggleCreateFormOpen(false));
    }, [client]);

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

    const transactions = client?.transactions;
    const debitTransactions = transactions.filter(t => t.type === 'debit');
    const creditTransactions = transactions.filter(t => t.type === 'credit');

    return (
        <PageSection
            className="client-transactions"
            title={
                <Tabs
                    items={[
                        { key: 'debit', value: 'debit', content: 'Поступления' },
                        { key: 'credit', value: 'credit', content: 'Списания' }
                    ]}
                    onChange={setView}
                />
            }
            actions={
                <Button
                    icon={<Icon name="add" />}
                    title="Создать"
                    text
                    iconOnly
                    onClick={toggleCreateFormOpen}
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