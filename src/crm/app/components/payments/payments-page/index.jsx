import { useCallback, useEffect } from 'react';

import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import { useBoolean } from 'shared/hooks/state';

import PaymentForm from 'crm/components/payments/payment-form';
import PaymentSearchForm from 'crm/components/payments/payment-search-form';
import PaymentsTable from 'crm/components/payments/payments-table';
import { useStore } from 'crm/store';

export default function Payments({ match, history }) {
    const [{ list: payments, single: payment }, actions] = useStore('payments');

    const [isPaymentFormOpen, togglePaymentFormOpen] = useBoolean(false);

    useEffect(() => {
        actions.getPayments();

        if (match.params.id) {
            actions.getPayment(match.params.id)
                .then(() => togglePaymentFormOpen(true));
        }
    }, []);

    const handleSubmit = useCallback(data => {
        return actions.updatePayment(data)
            .then(() => togglePaymentFormOpen(false));
    }, []);

    const handleEdit = useCallback(payment => {
        actions.setPayment(payment);
        togglePaymentFormOpen(true);
    }, []);

    const handleDelete = useCallback(payment => {
        if (confirm('Подтвердите удаление платежа')) {
            return actions.deletePayment(payment.id);
        }
    }, []);

    const handleOpen = useCallback(() => {
        actions.unsetPayment();
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
        <Page id="payments" loading={!payments}>
            <Page.Header
                title="Платежи"
                actions={[{
                    key: 'add',
                    icon: 'add',
                    title: 'Новый платеж',
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