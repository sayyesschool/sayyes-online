import { useCallback, useEffect } from 'react';

import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import { usePayment, usePayments } from 'shared/hooks/payments';
import { useBoolean } from 'shared/hooks/state';

import PaymentForm from 'crm/components/payments/payment-form';
import PaymentSearchForm from 'crm/components/payments/payment-search-form';
import PaymentsTable from 'crm/components/payments/payments-table';

export default function PaymentsPage({ match, history }) {
    const [payments, actions] = usePayments();
    const [payment] = usePayment(match.params.id);

    const [isPaymentFormOpen, togglePaymentFormOpen] = useBoolean(false);

    useEffect(() => {
        if (!payment?.id) return;

        togglePaymentFormOpen(true);
    }, [payment?.id, actions]);

    const handleSubmit = useCallback(data => {
        return actions.updatePayment(data)
            .then(() => togglePaymentFormOpen(false));
    }, []);

    const handleResolve = useCallback(payment => {
        return actions.resolvePayment(payment.uuid);
    }, [actions]);

    const handleDelete = useCallback(payment => {
        return actions.deletePayment(payment.id);
    }, [actions]);

    const handleEdit = useCallback(payment => {
        actions.setPayment(payment);
        togglePaymentFormOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        actions.unsetPayment();
        togglePaymentFormOpen(false);
        history.push('/payments');
    }, []);

    const handleSearch = useCallback(params => {
        console.log(params);
    }, []);

    return (
        <Page id="payments">
            <Page.Header
                title="Платежи"
                actions={[{
                    key: 'add',
                    icon: 'add',
                    content: 'Создать платеж',
                    color: 'primary',
                    variant: 'solid',
                    onClick: togglePaymentFormOpen
                }]}
            />

            <Page.Content>
                <PaymentSearchForm
                    onSubmit={handleSearch}
                />

                <Page.Section variant="outlined" compact>
                    <PaymentsTable
                        payments={payments}
                        onResolve={handleResolve}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </Page.Section>
            </Page.Content>

            <FormDialog
                title={payment ? 'Редактирование платежа' : 'Новый платеж'}
                open={isPaymentFormOpen}
                onClose={handleClose}
            >
                <PaymentForm
                    payment={payment || undefined}
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </Page>
    );
}